import { combineReducers } from 'redux';
import auth from "./auth";
import profile from "./profile";
import portfolio from "./portfolio";
import contact from "./contact";
import artists from "./artists";
import staff from "./staff";
import icons from "./icons";
import payment from "./payment";
import community from "./community"


const artorimoApp = combineReducers({
  auth, profile, portfolio, contact, artists, staff, payment, icons, community
})

export default artorimoApp;