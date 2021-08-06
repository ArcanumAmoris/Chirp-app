import {combineReducers} from "redux"
import Signup from './SignupReducer'
import Login from './loginReducer'
import getMessagesReducer from './getMessagesReducer'
import ErrorReducer from './setErrorReducer'
import activeUserId from './SetActiveUserIdReducer'


export default combineReducers({
    Signup,
    Login,
    getMessagesReducer,
    ErrorReducer,
    activeUserId
});