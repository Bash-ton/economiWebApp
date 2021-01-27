import React, {useEffect} from "react";
import './Header.css';
//actions
import { signOut } from '../Actions/authActions'
//redux
import {useDispatch, useSelector} from 'react-redux'
import authReducer from "../Reducers/authReducer";

const Header = () => {

    //hook
    let dispatch = useDispatch();
    //render depending on logged in or not
    const isLogged = useSelector(state => state.auth.isLogged)

    return(

        <div className="header-border">

            <div>LOGO</div>
            <div>Empty space</div>
            <div>Button/link</div>
            <div>Button/link</div>
            <div>Button/link</div>

            {isLogged ? <button onClick={() => {dispatch(signOut())}}>Log Out</button>: ""}
        </div>


    );

}

export default Header;