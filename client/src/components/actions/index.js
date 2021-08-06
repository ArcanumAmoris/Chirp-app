import axios from 'axios'
import store from '../../store';
import _ from 'lodash'
import ErrorReducer from '../reducers/setErrorReducer';
import userConsts from './actions-constants';


export const register = (email, password, username) => {
  return async (dispatch) => {
    const response = await axios.post("https://chirp-app-backend.herokuapp.com/register", email, password, username)
    store.dispatch({
      type: userConsts.SIGNUP,
      payload: response.data
    })
  }
}


export const saveMessage = (message, userID, contactID) => {
    return async dispatch => {
        const response = await axios.post("https://chirp-app-backend.herokuapp.com/message", {message, userID, contactID})
        .catch(error => store.dispatch(ErrorReducer({type: userConsts.ERROR,
          payload: response.data.error})))
        if (response.data.result) {
            store.dispatch({
              type: "message",
              payload: response.data
            })
        }
      }
}

export const getMessages = (currentUser) => {
    return async dispatch => {
      const getIDs = await axios.post("https://chirp-app-backend.herokuapp.com/get_contactIDs", {currentUser})
      var responseArray = []
      for (const id in getIDs.data) {
        const contactID = getIDs.data[id].userID
        var response = await axios.post("https://chirp-app-backend.herokuapp.com/get_messages", {currentUser, contactID})
        responseArray.push(response.data.result[0])
      }
      store.dispatch({ 
        type: "getMessages",
        payload: responseArray
      })
    } 
}
 
export const setActiveUserID = (userID, contactName) => ({
    type: userConsts.SETACTIVEUSERID,
    payload: {
      userID: userID,
      contactName: contactName
    }
})
