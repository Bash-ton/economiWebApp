import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//provide global store to entire app
import {Provider} from 'react-redux'
//combined all reducers
import allReducers from './Reducers/index.js'
//redux store
import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
//firebase
import { getFirebase, reactReduxFirebase, ReactReduxFirebaseProvider } from "react-redux-firebase";
import {reduxFirestore, getFirestore, createFirestoreInstance} from "redux-firestore";
import configFirebase from './DB/ConfigFirebaseDB'
import firebase from "firebase/app";
//

//save store
const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    }catch (e){
        console.log(e)
    }
}
//load store
const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('state')
        if(serializedState === null){
            return undefined
        }
        return JSON.parse(serializedState);

    }catch (e){
        console.log(e)
        return undefined
    }
}

const persistedState = loadFromLocalStorage();

//TODO duble check thunk
//initiate the store /w all combined resources
const myStore = createStore(allReducers, persistedState,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
        reduxFirestore(configFirebase)
    )
);

myStore.subscribe(()=> {saveToLocalStorage(myStore.getState())})

//setup the firebase config /w latest ver. of redux working with getFirebase
//wrap ReactReduxFirebase around app, see below
const rrfProps = {
    firebase,
    config: configFirebase,
    dispatch: myStore.dispatch,
    createFirestoreInstance
};

//wrap everything inside Provider to give whole app access to the store
ReactDOM.render(
    <Provider store={myStore}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ReactReduxFirebaseProvider>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
