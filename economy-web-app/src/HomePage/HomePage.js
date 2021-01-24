import React, {useEffect} from "react";
//import css here
//redux import reducer
import {useSelector} from "react-redux";

//function instead of class to use hooks
const HomePage = () => {

    //render depending on logged in or not
    const isLogged = useSelector(state => state.auth.isLogged)

    //add to all pages that may need to force to first page when logged out
    useEffect(() => {
        if(isLogged === false){
            window.location = '/';
        }
    }, [isLogged])

        return(
            <div className="HomePage">
                {isLogged ? <div>Hidden Home Page here!</div> : <div>Please log in first!</div>}
            </div>
        )
}

export default HomePage;