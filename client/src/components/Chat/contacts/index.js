import React, { useEffect, useState } from 'react'
import store from '../../../store'
import { getMessages, setActiveUserID} from '../../actions'
import './style.css'
import _ from 'lodash'
import HomeButton from '../../homeButton'
import { useSelector } from 'react-redux'
 
   
export default function Contacts() {
    const messagesObj =   useSelector(state => state.getMessagesReducer.messages.message)
    const messageArr = _.values(messagesObj)
    const currentUser = localStorage.getItem("userId")
  
    useEffect(() => { 
        store.dispatch(getMessages(currentUser))
    }, [])

    function handleClick(userID, contactName) {
        store.dispatch(setActiveUserID(userID, contactName))
    }

    return (
        <div className="contacts_component">
            <>
            <div className="header"> 
                <span>Chats</span>
            </div> 
             {messageArr.map((val) => {
                 return (
                <div className="message_div" onClick={() => {handleClick(val.userID, val.username)}} key={val.messageID}>
                    <h1 className="username">{val.username}</h1>
                    <p className="message">{val.message}</p>
                    <p className="time_sent">{val.time_sent}</p>
                 </div>
             )})}
            </>
        </div>
    ) 
}
