import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

//init firebase
const firebaseConfig = {
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

    apiKey: "AIzaSyCG11AMyjVBW8Sa0aD2KxFXTZi98rb75pA",
    authDomain: "economywebappdb.firebaseapp.com",
    databaseURL: "https://economywebappdb-default-rtdb.firebaseio.com",
    projectId: "economywebappdb",
    storageBucket: "economywebappdb.appspot.com",
    messagingSenderId: "839452292417",
    appId: "1:839452292417:web:f3f9de383a242d78641dc0",
    measurementId: "G-M5Z9Z6L8EN"

};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true});

export default firebase;