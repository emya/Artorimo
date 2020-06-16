import { combineReducers } from 'redux';
import auth from "./auth";
import profile from "./profile";
import portfolio from "./portfolio";
import contact from "./contact";


const artorimoApp = combineReducers({
  auth, profile, portfolio, contact
})

export default artorimoApp;