// Firebase.js

import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyA0OSwDu7KV1lLPQqiYds9biCb2L0M-ELs",
    authDomain: "toma-to-do.firebaseapp.com",
    projectId: "toma-to-do",
    storageBucket: "toma-to-do.appspot.com",
    messagingSenderId: "633417684612",
    appId: "1:633417684612:web:5f254b9412963400b014d1"
};

// Initialize Firebase

const firebase = initializeApp(firebaseConfig);

export default firebase;