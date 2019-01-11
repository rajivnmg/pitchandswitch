import { combineReducers } from "redux";
import appReducer from "./appReducer";
import searchListingReducer from "./searchListingReducer";
export default combineReducers({ appReducer, searchListingReducer});
