export default function Message(state = [], action) {
    switch(action.type) {
        case "message":
            return {
                ...state,
                response: action.payload
            }
        default:
            return state
    }
} 