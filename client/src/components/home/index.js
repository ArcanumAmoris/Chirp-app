import React, { useEffect } from 'react'
import store from '../../store/index'
import {useHistory} from 'react-router-dom'
import {Link} from 'react-router-dom'
import people_talking from '../../images/people_talking.png'
import './home.css'
import Signup from '../reducers/SignupReducer'
import _ from 'lodash'

export default function Home() {
    const state = store.getState()
    const user = localStorage.getItem("user")
    const email = state.Login.userObject.email
    const history = useHistory()
    
    function logout() {
        localStorage.clear() 
        window.location.reload()
    }

    return (
        <>
        <div className="navbar">
            <Link to="/about">About</Link>
            <Link to="/chat">Chat</Link>
            <div className="user_entrance">
            {user ? <button className="logout_button" onClick={() => logout()}>LogOut</button> : <><Link to="/login">Login</Link>
            <Link to="/signup">SignUp</Link> </>}
            </div>
        </div>
        <div className="home_page">
            <h2 className="welcome_text">Welcome To Chirp</h2>
            <img src={people_talking} alt="chat" className="chat_img"></img>   
        </div>
        </>
    )
}
    