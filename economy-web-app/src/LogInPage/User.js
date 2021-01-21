
import React, {PureComponent} from 'react'
//import css here
import ConfigFirebaseDB from "../DB/ConfigFirebaseDB";


import firebase from "firebase/app"
import "firebase/auth"
//import DB to create for new users ? needed also if same for all?

class User extends PureComponent {
    constructor() {
        super();
        firebase.initializeApp(ConfigFirebaseDB);
        firebase.auth();


    }
}

const user = new User();
export default user;