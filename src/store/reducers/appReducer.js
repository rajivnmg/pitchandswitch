import * as ActionTypes from "../actionTypes";
const initialState = {
  isAuthenticated: false,
  username: ''
};
const appReducer = (state = initialState, action) => {
  switch (action.type) {
	case ActionTypes.SET_AUTHENTICATION:
      return { ...state,  ...action.payload};
    default:
		return state;
  }  
};
export default appReducer;
