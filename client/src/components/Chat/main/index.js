import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import store from '../../../store'
import ChatWindow from '../chatWindow/chatWindow'
import './main.css'

export default function Main() {
    const activeUser = useSelector(state => state.activeUserId)

    const renderMainContent = () => {
        if (!activeUser) {
            return <h1>Nothing to show</h1>
        } else {
            return <ChatWindow activeUser={activeUser}/>

        }
    }

    return <main className="main">{renderMainContent()}</main>;


}
 