//TODO remove loggingReducer, it's now included in "auth"

//import all reducers
import isLoggedReducer from './IsLoggedIn'
import { combineReducers } from 'redux'

import { firebaseReducer } from "react-redux-firebase";
import authReducer from "./authReducer";
import ItemReducer from "./ItemReducer";
import groupReducer from "./groupReducer";



const allReducers = combineReducers({
    loggingReducer: isLoggedReducer,
    auth: authReducer,
    firebase: firebaseReducer,
    items: ItemReducer,
    currentGroup: groupReducer,

});

export default allReducers;