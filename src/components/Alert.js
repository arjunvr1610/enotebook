import React from 'react'

export default function Alert(props) {
    const capitalize = (word) => {
        if(word === "danger") {
            word = "error"
        }
        const lower = word.toLowerCase()
        return lower.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    }
    return (
        props.alert && <div className={`alert alert-${props.alert.type} fade show`} role="alert">
            <strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg}
        </div>
    )
}
