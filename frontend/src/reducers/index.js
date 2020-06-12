import { combineReducers } from 'redux';
import auth from "./auth";
import profile from "./profile";
import portfolio from "./portfolio";


const artorimoApp = combineReducers({
  auth, profile, portfolio
})

export default artorimoApp;