import userConsts from "../actions/actions-constants"

const initialState = {
    error: ''
}

export default function ErrorReducer(state = initialState, action) {
    switch(action.type) {
        case userConsts.ERROR: 
            return {
                ...state, 
                error: action.payload.error
            }
        default:
            return state
    }

}