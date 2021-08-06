import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router'
import store from '../../store'
import userConsts from '../actions/actions-constants'
import HomeButton from '../homeButton'
import './login.css'

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const history = useHistory()



  const handleSubmit = () => {
    return async dispatch => {
      const response = await axios.post("https://chirp-app-backend.herokuapp.com/login", {email, password})
      if (response.data.auth) {
          store.dispatch({
            type: userConsts.LOGIN,
            payload: response.data
          })
          history.push("/")
          localStorage.setItem("user", response.data.result[0].username)
          localStorage.setItem("token", response.data.token)
          localStorage.setItem("userId", response.data.userId)
      }
    }
  }

  const submit = () => {
    store.dispatch(handleSubmit()) 
  }

  return (
    <>
    <HomeButton />
   <form className="login_form" onSubmit={(e) => e.preventDefault()}>
      <h3>Login</h3>
      <div className="form_item">
        <label>Email</label>
        <input type="text" autoComplete="text" placeholder="enter your email" onChange={(e) => {setEmail(e.target.value)}}></input>
      </div>
      <div className="form_item">
        <label>Password</label>
        <input type="password" autoComplete="current-password" placeholder="enter your password"  onChange={(e) => {setPassword(e.target.value)}}></input>
      </div>
      <button type="submit" onClick={(e) => submit()}>Login</button>
   </form>
   </>
  )
}
