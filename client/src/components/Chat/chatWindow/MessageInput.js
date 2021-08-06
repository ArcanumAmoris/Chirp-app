import React, { useEffect, useState } from 'react'
import store from '../../../store/index'
import {getMessages, saveMessage, setActiveUserID} from '../../../components/actions/index'
import "./messageInput.css"
import { useSelector } from 'react-redux'

function MessageInput() {
    const [message, setMessage] = useState("")
    const contactID = useSelector(state => state.activeUserId.userID)
    const userID = localStorage.getItem("userId")
 
    function sendMessage() {
        if (message) {
            store.dispatch(saveMessage(message, userID, contactID))
        }else {
            return
        }
    }
    
    return (
        <form className="message_form" onSubmit={(e) => e.preventDefault(), sendMessage}>
            <input 
                className="message_input"
                type="text"
                placeholder="send a message"
                onChange={(e) => {setMessage(e.target.value)}}
            ></input>
        </form>
    )
}
export default MessageInput
