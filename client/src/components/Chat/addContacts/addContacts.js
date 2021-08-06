import React from 'react'
import { useHistory } from 'react-router'
import contacts from "../../../images/contacts.png"

export default function AddContacts() {
    const history = useHistory()

    function routeUserToSelectContact() {
        history.push("/select_contact")
    }

    return (
        <div onClick={() => routeUserToSelectContact()}>
            <span title="message a new contact"><img src={contacts} alt="contacts"></img></span>
        </div>
    )
}
