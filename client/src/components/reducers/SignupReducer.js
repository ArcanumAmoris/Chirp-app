import store from '../../store';
import userConsts from '../actions/actions-constants'

export default function Signup(state = [], action) {
    switch(action.type) {
        case userConsts.SIGNUP:
            return {
                ...state,
                value: action.payload
            }
        default:
            return state;
    }
}

