import { combineReducers } from 'redux';
import auth from "./auth";
import profile from "./profile";
import portfolio from "./portfolio";
import contact from "./contact";
import artists from "./artists";


const artorimoApp = combineReducers({
  auth, profile, portfolio, contact, artists
})

export default artorimoApp;