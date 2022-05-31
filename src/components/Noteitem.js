import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
    const { Note, updateNote, showAlert } = props

    const context = useContext(noteContext)
    const {deleteNote} = context

    return (
        <div className="col-md-3 my-3">
            <div className="card" style={{width: "18rem;"}}>
                <div className="card-body">
                    <h5 className="card-title">{Note.title}</h5>
                    <p className="card-text">{Note.description}</p>
                    <p className="card-text">#{Note.tag}</p>
                    <i className="fa-solid fa-trash mx-3" onClick={() => {deleteNote(Note._id); showAlert("Note permanently deleted from enotebook", "success")}}></i>
                    <i className="fa-solid fa-pen-to-square mx-3" onClick={() => {updateNote(Note)}}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
