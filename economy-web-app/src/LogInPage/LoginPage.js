import React from 'react'

import {useState, useEffect} from "react";
//redux
import {useDispatch, useSelector} from 'react-redux'
//actions
import { signIn } from "../Actions/authActions";
import authReducer from "../Reducers/authReducer";


//TODO add cookies for mail maybe password
//TODO change page when logged in
//TODO change page when logged out
const LoginPage = () => {
    //call hook dispatch
    const dispatch = useDispatch();

    //hook on logged in or not
    const isLogged = useSelector(state => state.auth.isLogged);


    //update state and get email while typing
    const [email, setEmail] = useState("");
    const handleEmailInput = (event) => {
        setEmail(event.target.value);
    };

    //update state and get password while typing
    //added arrow function in userState to only call once as a constructor (more optimized if complicated function is used in future)
    const [password, setPassword] = useState(() => {
        return "";
    });
    const handlePasswordInput = (event) => {
        setPassword(event.target.value);
    };

    //"variable "isLogged" did update"
    useEffect(() => {
        if(isLogged === true){
            console.log("inne");
            window.location = '/home';

        }
    }, [isLogged])


    return (
        <div>
            <br></br>
            <input type="text" name="email" placeholder="email" onChange={evt => handleEmailInput(evt)}></input>
            <br></br>
            <input type="password" placeholder="password" onChange={evt => handlePasswordInput(evt)}></input>
            <br></br>
            <button onClick={() => {dispatch(signIn({email: email, password: password}))}}>Log in</button>
        </div>
    )
}

export default LoginPage