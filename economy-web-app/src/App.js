import React, {Component} from 'react'
import { Route } from "react-router-dom"
import LoginPage from "./LogInPage/LoginPage";
import './App.css';

import Header from './Header/Header.js';
import AddItemPage from './AddItemPage/AddItemPage'
import TablePage from "./MonthPage/TablePage";
import Groups from './Groups/GroupsPage';
import ChartsPage from "./MonthPage/ChartsPage";

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
                exact path="/charts"
                render={() => <ChartsPage/>}
            />
            <Route
                exact path="/addItem"
                render={() => <AddItemPage/>}
            />
            <Route
                exact path="/table"
                render={() => <TablePage/>}
            />
            <Route
                exact path="/groups"
                render={() => <Groups/>}
            />

        </div>

    )
  }

}

export default App;
