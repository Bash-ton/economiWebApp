//TODO remove loggingReducer, it's now included in "auth"

//import all reducers
import isLoggedReducer from './IsLoggedIn'
import { combineReducers } from 'redux'
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import authReducer from "./authReducer";



const allReducers = combineReducers({
    loggingReducer: isLoggedReducer,
    auth: authReducer,
    firebase: firebaseReducer
});

export default allReducers;