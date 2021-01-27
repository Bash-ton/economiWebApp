import React from 'react'
import './LoginPage.css';
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

/*
*             <div className="LoginForm-wrapper">
                <h2>Login</h2>
                <br></br>
                <input type="text" name="email" placeholder="email" onChange={evt => handleEmailInput(evt)}></input>
                <br></br>
                <input type="password" placeholder="password" onChange={evt => handlePasswordInput(evt)}></input>
                <br></br>
                <button onClick={() => {dispatch(signIn({email: email, password: password}))}}>Log in</button>
            </div>
* */
    return (
        <div className="LoginPage-wrapper">
            <div className="LoginForm-wrapper">
                <div action="" className="form">
                    <h2>Login</h2>
                    <div className="input-group">
                        <input type="text" name="loginUser" autoComplete="off" id="loginUser"  required onChange={evt => handleEmailInput(evt)}></input>
                        <label htmlFor="loginUser">User name</label>
                    </div>
                    <div className="input-group">
                        <input type="password" name="loginPassword" id="loginPassword" required  onChange={evt => handlePasswordInput(evt)}></input>
                        <label htmlFor="loginPassword">Password</label>
                    </div>
                    <button className="submit-btn" onClick={() => {dispatch(signIn({email: email, password: password}))}}>Log in</button>
                    <a href="#forgot-pw" className="forgot-pw">Forgot password?</a>
                </div>

                <div id="forgot-pw">
                    <div action="" className="form">
                        <a href="#" className="close">&times;</a>
                        <h2>Reset Password</h2>
                        <div className="input-group">
                            <input type="email" name="email" id="email"  required></input>
                            <label htmlFor="email">Email</label>
                        </div>
                        <button className="submit-btn">Submit</button>
                    </div>

                </div>
            </div>
            <div className="box">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default LoginPage