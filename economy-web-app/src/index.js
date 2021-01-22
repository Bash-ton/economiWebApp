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
import {createStore} from "redux";

//initiate the store /w all combined recuers
const myStore = createStore(allReducers);

//wrap everything inside Provider to give whole app access to the store
ReactDOM.render(
    <Provider store={myStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
