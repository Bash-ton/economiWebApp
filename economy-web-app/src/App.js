import React, {Component} from 'react'
import {Route} from "react-router-dom"
import HomePage from './HomePage/HomePage.js';
import LoginPage from "./LogInPage/LoginPage";
import './App.css';
//import user from "./LogInPage/User";
import Header from './Header/Header.js';
import AddItemPage from './AddItemPage/AddItemPage'
import TablePage from "./MonthPage/TablePage";

class App extends Component{
  render(){

    return(
        <div className="economyApp">
            <header className="economyAppHeader">
                <Header/>
            </header>
            <Route
                exact path="/"
                render={() => <LoginPage/>}
            />
            <Route
                exact path="/home"
                render={() => <HomePage/>}
            />
            <Route
                exact path="/addItem"
                render={() => <AddItemPage/>}
            />
            <Route
                exact path="/table"
                render={() => <TablePage/>}
            />

        </div>

    )
  }

}

export default App;
