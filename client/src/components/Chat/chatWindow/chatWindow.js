import React from 'react'
import Chats from './Chats'
import Header from './header'
import MessageInput from './MessageInput'
import "./chatWindow.css"
import store from '../../../store'
import _ , { conforms, groupBy,  }from 'lodash'
import { useSelector } from 'react-redux'

export default function ChatWindow() {
    
    return (
        <div className="chat_window">
            <Header />
            <Chats />
            <MessageInput />
        </div> 
    )
}
