//TODO remove loggingReducer, it's now included in "auth"

//import all reducers
import isLoggedReducer from './IsLoggedIn'
import { combineReducers } from 'redux'

import { firebaseReducer } from "react-redux-firebase";
import authReducer from "./authReducer";
import ItemReducer from "./ItemReducer";
import groupReducer from "./groupReducer";
import moneyReducer from "./moneyReducer"
import ColorReducer from "./colorReducer";



const allReducers = combineReducers({
    loggingReducer: isLoggedReducer,
    auth: authReducer,
    firebase: firebaseReducer,
    items: ItemReducer,
    currentGroup: groupReducer,
    moneyInfo: moneyReducer,
    currentColors: ColorReducer


});
/*
const rootReducer = (state, action) => {
    if (action.type === "RESET_STORE") {
        const allReducers = combineReducers({
        loggingReducer: undefined,
            auth: undefined,
            firebase: undefined,
            items: undefined,
            currentGroup: undefined,
            moneyInfo: undefined,
            currentColors: undefined
        });
        return allReducers;
    }else{
        const allReducers = combineReducers({
            loggingReducer: isLoggedReducer,
            auth: authReducer,
            firebase: firebaseReducer,
            items: ItemReducer,
            currentGroup: groupReducer,
            moneyInfo: moneyReducer,
            currentColors: ColorReducer


        });
        return allReducers;
    }

}*/

export default allReducers;