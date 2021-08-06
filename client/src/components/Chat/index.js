import React, { useEffect } from 'react'
import Contacts from './contacts'
import Main from './main'
import store from '../../store/index'
import './style.css'
import { getMessages } from '../actions'
import _ from 'lodash'
import AddContacts from './addContacts/addContacts'

function Chat() {
    return (
        <div className="main_chat">
            <div className="add_contacts_div">
                <AddContacts />
            </div>
            <Contacts />
            <Main /> 
        </div>
    )
}

export default Chat
