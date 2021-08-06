import userConsts from "../actions/actions-constants";

export default function activeUserId(state = null, action) {
  switch (action.type) {
    case userConsts.SETACTIVEUSERID: 
      return action.payload
    default:
      return state;
  }
} 