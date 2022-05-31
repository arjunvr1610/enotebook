import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
  const context = useContext(noteContext)
  const {addNote} = context

  const [note, setNote] = useState({title: "", description: "", tag: ""})
  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value})
  } 
  const handleClick = (e) => {
    e.preventDefault()
    addNote(note.title, note.description, note.tag)
    setNote({title: "", description: "", tag: ""})
    props.showAlert("New note added", "success")
  }
  return (
    <div>
      <div className='container my-4'>
        <h1>Add Note</h1>
        <form onSubmit={handleClick}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input value={note.title} minLength={3} required type="text" className="form-control" id="title" name='title' onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input value={note.description} minLength={5} required type="text" className="form-control" id="description" name='description' onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input value={note.tag} required type="text" className="form-control" id="tag" name='tag' onChange={onChange}/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
