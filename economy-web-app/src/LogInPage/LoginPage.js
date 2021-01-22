import React from 'react'
//remove?
import "firebase/auth"
import {useState} from "react";


//TODO make button call login functions for user insted. Maybe observables /w RxJS?
const LoginPage = () => {
    //update state and get email while typing
    const [email, setEmail] = useState("");
    const handleEmailInput = (event) => {
        if(event.nativeEvent.data !== null){
            setEmail(email + event.nativeEvent.data);
        }else{
            setEmail("");
        }

        console.log("full email: " + email);
    };

    //update state and get password while typing
    //added arrow function in userState to only call once as a constructor
    const [password, setPassword] = useState(() => {
        return "";
    });
    const handlePasswordInput = (event) => {
        if(event.nativeEvent.data !== null){
            setPassword(password + event.nativeEvent.data);
        }else{
            setPassword("");
        }

        console.log("full pass: " + password);
    };

    return(
        <div>
            <div className="logInForm">
                <br></br>
                <input type="text" name="email" placeholder="email" onChange={evt => handleEmailInput(evt)}></input>
                <br></br>
                <input type="password" placeholder="password" onChange={evt => handlePasswordInput(evt)}></input>
                <br></br>
                <button onClick={ () => {console.log(email)}}>Log in</button>
            </div>
        </div>

    )

}



export default LoginPage