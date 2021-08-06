import axios from 'axios'
import React, { useEffect, useState } from 'react'
import store from '../../../store'
import './chats.css'
import {useSelector } from "react-redux"

function Chats() {
    const [messages, setMessages] = useState([])
    const activeUser = useSelector(state => state.activeUserId.userID)
    const userID = localStorage.getItem("userId")

    async function getConvoMessages() {
        const response = await axios.post("https://chirp-app-backend.herokuapp.com/getconvomessages", {activeUser, userID})
        setMessages(response.data)
    }
    useEffect(() => {
        getConvoMessages()
    }, [activeUser])
    
    return (
        <div className="chats">
            {messages.map((val, index) => {
                return (
                    <div key={index}>
                        <p className={`Chat ${activeUser == val.contactID ? "is-user-msg" : ""}`}>{val.message}</p>
                    </div>
                )
            })}
        </div>
    )
}
export default Chats
