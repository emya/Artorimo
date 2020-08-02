import { combineReducers } from 'redux';
import auth from "./auth";
import profile from "./profile";
import portfolio from "./portfolio";
import contact from "./contact";
import artists from "./artists";
import staff from "./staff";


const artorimoApp = combineReducers({
  auth, profile, portfolio, contact, artists, staff
})

export default artorimoApp;