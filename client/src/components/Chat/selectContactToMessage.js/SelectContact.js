import axios from 'axios'
import React,{useEffect, useState} from 'react'
import store from '../../../store'
import HomeButton from "../../homeButton/index"
import { setActiveUserID } from '../../actions'
import "./style.css"
import { useHistory } from 'react-router'

export default function SelectContact() {
    const [userContacts, setUserContacts] = useState([])
    const currentUser = localStorage.getItem("userId")
    const history = useHistory()


    useEffect(() => {
        getAllUsersContacts()
    }, [])

    async function getAllUsersContacts() {
        const response = await axios.post("https://chirp-app-backend.herokuapp.com/getAllUsersContacts", {currentUser})
        setUserContacts(response.data)
    }

    function selectedUser(contactID, contactName) {
        store.dispatch(setActiveUserID(contactID, contactName))
        history.push("/chat")
    }
    
    return (
        <>
        <HomeButton />
        <div className="main_div">
            {userContacts.map((val) => {
                return (
                    <div key={val.userID} className="select_contact_div" onClick={() => selectedUser(val.userID, val.username)}>
                        <h2 className="username">{val.username}</h2>
                        <p className="status">This is my status</p>
                    </div>
                )
            })}
        </div>
        </>
    )
}
