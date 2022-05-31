import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = 'http://localhost:5000'
    const token = localStorage.getItem('token')

    const [notes, setNotes] = useState([])

    const getNotes = async () => {
        // API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        });
        const res = await response.json()

        //Set Notes
        setNotes(res)
    }

    const addNote = async (title, description, tag) => {
        //API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },

            body: JSON.stringify({ title, description, tag })
        });
        const res = await response.json()

        //Set Notes
        setNotes(notes.concat(res))
    }

    const deleteNote = async(id) => {
        //API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
        });

        //For client side 
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    const editNote = async(id, title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },

            body: JSON.stringify({ title, description, tag })
        });
        const res = await response.json()
        console.log(res)

        //Client side edit
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index]
            if (element._id === id) {
                newNotes[index].title = title
                newNotes[index].description = description
                newNotes[index].tag = tag
                break
            }
        }
        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState