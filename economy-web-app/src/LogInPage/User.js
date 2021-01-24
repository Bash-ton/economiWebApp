//TODO: OLD!, probably remove later, currently not used

//import css here
import ConfigFirebaseDB from "../DB/ConfigFirebaseDB";


import firebase from "firebase/app"
import initializeApp from "firebase.initializeApp";
//import "firebase/auth"
//import DB to create for new users ? needed also if same for all?

const User = () => {

    firebase.initializeApp(ConfigFirebaseDB);
    firebase.auth();

}

const initializeFirebase = () => {
    firebase.initializeApp(ConfigFirebaseDB);
    firebase.auth();
}

export const logInUser = (email, password) => {
    initializeFirebase();

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            if(user){
                console.log(firebase.auth().currentUser);
            }else{
                console.log("no user found!");
            }
        });
}
