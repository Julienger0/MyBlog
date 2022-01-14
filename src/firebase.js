import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const config = {
    apiKey: "AIzaSyBaRfhask8-aoBtP_Fz-t1AiwKJD5HIfL4",
    authDomain: "myblog-4d944.firebaseapp.com",
    projectId: "myblog-4d944",
    storageBucket: "myblog-4d944.appspot.com",
    messagingSenderId: "427070588499",
    appId: "1:427070588499:web:1707ef49a40484932428a6",
    measurementId: "G-GW0FC549S2"
  };


firebase.initializeApp(config)

export default firebase
