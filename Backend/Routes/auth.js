const express = require('express')
const { body, validationResult } = require('express-validator')
const User = require('../Models/User')
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const fetchuser = require('../Middlewares/fetchuser')

const JWT_SECRET = "jaibajrangbalithododushmankinali"

// Route1: Create a User using POST "/api/auth/createuser". No login required.
router.post('/createuser',
 body("name", "Enter a valid name").isLength({min: 3}),
 body("email", "Enter a valid email").isEmail(),
 body("password", "Enter a valid password").isLength({min: 6}),
 async(req, res)=>{
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Check weather the user with this same userid already exists
    try {
        let user = await User.findOne({email: req.body.email})
        if(user) {
            success = false
            return res.status(400).json({success, error: "Sorry, a user with this email id already exists"})
        }
    
        // Create a new user
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        const data = {
            user:{
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true
        res.json({success, authToken});
    } catch(error) {
        res.status(500).send("Some error occured")
    }
})

// Route2: Login using credentials POST "/api/auth/login". 
router.post('/login',
 body('email', 'Enter a valid email').isEmail(),
 body('password', 'Password cannot be blank').exists(),   
 async(req, res) => {
    const errors = validationResult(req);
    let success = false;
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user) {
            success = false
            return res.status(400).json({success, error: "Enter valid user credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare) {
            success = false
            return res.status(400).json({success, error: "Enter valid user credentials"});
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true
        res.json({success, authToken});
        
    } catch (error) {
        res.status(500).send("Some error occured");        
    }
})

// Route3: fetch user details using POST"/api/auth/getuser".
router.post('/getuser', fetchuser, async(req, res) => {
    try {
       const userId = req.user.id;
       const user = await User.findById(userId).select('-password');
       res.send(user); 
    } catch (error) {
        res.status(500).send("Some error occured");   
    }
})
module.exports = router