import { combineReducers } from 'redux';
import auth from "./auth";
import profile from "./profile";


const artorimoApp = combineReducers({
  auth, profile
})

export default artorimoApp;