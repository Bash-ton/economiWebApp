import React from "react";
//import css here
//redux import reducer
import {useSelector} from "react-redux";

//function instead of class to use hooks
const HomePage = () => {
   // loggingHook() {
        //loggingReducer is from Reducers/index.js where all reducers are combined and named
        const isLogged = useSelector(state => state.loggingReducer)
       // return isLogged
   // }


        return(
            <div className="HomePage">

                {isLogged ? <div>Hidden Home Page here!</div> : <div>Please log in first!</div>}
            </div>
        )


}

export default HomePage;