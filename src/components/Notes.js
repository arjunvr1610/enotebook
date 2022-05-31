import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'
import AddNote from "./AddNote"
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
  const navigate = useNavigate()
  const context = useContext(noteContext)
  const { notes, getNotes, editNote } = context

  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})
  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value})
  } 

  const handleEditClick = (e) => {
    e.preventDefault()
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click()
    props.showAlert("Note successfully edited", "success")
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()
      // eslint-disable-next-line
    } else {
      navigate('/login')
    }
    
  }, [])

  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
  }
  const ref = useRef(null)
  const refClose = useRef(null)
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle'
                  value={note.etitle} onChange={onChange}  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' onChange={onChange} value={note.edescription} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' onChange={onChange} value={note.etag}/>
                </div>
              </form>

            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleEditClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <div className='row my-4'>
        <h1>Your Notes</h1>
        {notes.length!==0?notes.map((note) => {
          return (
            <Noteitem
              key={note._id}
              Note={note}
              updateNote={updateNote}
              showAlert={props.showAlert}
            />
          )
        }):<p>Please add some notes here!!</p>}
      </div>
    </>
  )
}

export default Notes
