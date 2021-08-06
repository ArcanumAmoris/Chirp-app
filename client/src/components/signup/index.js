import React, {useState, useEffect} from 'react'
import store from '../../store/index'
import {useHistory} from 'react-router-dom'
import userConsts from '../actions/actions-constants'
import {any, register, sendFormData} from '../actions/index'
import axios from 'axios'
import HomeButton from '../homeButton'

export default function Signup() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const history = useHistory()

    function check_form_data() {
        if(!email || !password || !username || password !== confirmPassword) {
            return
        }else {
            store.dispatch(register())
        }
    }

    axios.defaults.withCredentials = true;
    const register = () => {
        return async (dispatch) => {
        history.push("/login")
        const response = await axios.post("https://chirp-app-backend.herokuapp.com/register", {email, password, username})
        store.dispatch({
            type: userConsts.SIGNUP,
            payload: response.data
        })
        }
    }

    return (
        <>
        <HomeButton />
        <form className="login_form" onSubmit={check_form_data}>
            <h3>SignUp</h3>
            <div className="form_item">
                <label>Email</label>
                <input type="text" placeholder="enter your email" required onChange={(e) => {setEmail(e.target.value)}}></input>
            </div>
            <div className="form_item">
                <label>Username</label>
                <input type="text" placeholder="enter your username" required onChange={(e) => {setUsername(e.target.value)}}></input>
            </div>
            <div className="form_item">
                <label>Password</label>
                <input type="password" placeholder="enter your password" required onChange={(e) => {setPassword(e.target.value)}}></input>
            </div>
            <div className="form_item">
                <label>Confirm Password</label>
                <input type="password" placeholder="re-enter your password" required onChange={(e) => {setConfirmPassword(e.target.value)}}></input>
            </div>
            <button>SignUp</button>
        </form>
        </>
    )
}