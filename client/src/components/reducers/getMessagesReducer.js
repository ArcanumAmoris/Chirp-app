const initialState = {
    messages: {
        message: '',
    }
} 


export default function getMessagesReducer(state = initialState, action) {
    switch(action.type) { 
        case "getMessages": 
            return {
                ...state, 
                messages: {
                    message: action.payload.map(data => {return data}),
                }
            }
        default:
            return state
    }

}