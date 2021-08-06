import React from 'react'
import {useHistory} from 'react-router-dom'
import './index.css'

function HomeButton() {
    const history = useHistory()
    function takeToHomePage() {
        history.push("/")
    }

    return (
            <button className="home_button" onClick={takeToHomePage}>Home</button>
    )
}

export default HomeButton
