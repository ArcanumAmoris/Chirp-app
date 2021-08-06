import userConsts from "../actions/actions-constants"

const initialState = {
    userObject: {
        username: "",
        email: "",
        userID: "",
    }
}


export default function Login(state = initialState, action) {
    switch (action.type) {
        case userConsts.LOGIN:
            return {
                ...state,
                userObject: {
                    username: action.payload.result[0].username,
                    email: action.payload.result[0].email,
                    userID: action.payload.result[0].userID
                }
            }
        default:
            return state
    }
}