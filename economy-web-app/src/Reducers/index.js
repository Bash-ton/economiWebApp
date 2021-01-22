//import all reducers
import isLoggedReducer from './IsLoggedIn'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    loggingReducer: isLoggedReducer,
});

export default allReducers;