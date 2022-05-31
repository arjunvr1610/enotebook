const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const fetchuser = require('../Middlewares/fetchuser')
const Note = require('../Models/Note')

// Route1: fetch all notes using GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async(req, res)=>{
    try {
        const notes = await Note.find({user: req.user.id})
        res.json(notes)
    } catch (error) {
        return res.status(500).send('Some error occured')
    }
    
})

// Route2: add note using POST "/api/notes/addnote". Login required
router.post('/addnote',
 body('title', 'Title must be atleast 3 characters').isLength({min: 3}),
 body('description', 'Description must contain atleast 5 characters').isLength({min: 5}),
 fetchuser, 
 async(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {title, description, tag} = req.body
    try {
       const note = new Note({
            user: req.user.id,
            title,
            description,
            tag
       })

       const savedNote = await note.save()
       res.json(savedNote)
    } catch (error) {
        return res.status(500).send('Some error occured')
    }
})

// Route2: update note using PUT "/api/notes/updatenote/:id". Login required
router.put('/updatenote/:id', 
 fetchuser, 
 async(req, res) => {
    const {title, description, tag} = req.body
    try {
        //create new note 
        const newNote = {}
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}
        
        const note = await Note.findById(req.params.id)
        //check if note is present 
        if(!note) {res.status(404).send('Not found')}

        //check if user is updating his own note
        if(note.user.toString() !== req.user.id) {res.status(401).send('Not allowed')}

        //update note using new note
        const updated_note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})

        res.json({updated_note}) 
    } catch (error) {
        return res.status(500).send('Some error occured')
    }
    
})

// Route3: delete note using DELETE "/api/notes/deletenote/:id". Login required
router.delete('/deletenote/:id',
 fetchuser,
 async(req, res) => {
     try {
        //find note using id
        const note = await Note.findById(req.params.id)

        //check if note is present
        if(!note) {res.status(404).send('Not found')}

        //check if you are deleting your own note
        if(note.user.toString() !== req.user.id) {res.status(401).send('Not allowed')}

        //delete note
        await Note.findByIdAndDelete(req.params.id)

        res.send('Deleted')
     } catch (error) {
        console.log(error)
        return res.status(500).send('Some error occured')
     }
    
})

module.exports = router