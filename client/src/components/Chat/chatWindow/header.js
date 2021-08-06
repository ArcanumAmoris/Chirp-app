import React from 'react'
import { useSelector } from 'react-redux'
import "./header.css"

function Header({activeUser}) {
    const name = useSelector(state => state.activeUserId.contactName)

    return (
        <div className="header_main">
            <h2 id="username">{name}</h2>
        </div>
    )
}

export default Header
