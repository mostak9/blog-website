// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAqhPjWqpVqTHet0x_WCTBTQCMBRC7Jc2Y",
  authDomain: "react-js-bloging-site.firebaseapp.com",
  projectId: "react-js-bloging-site",
  storageBucket: "react-js-bloging-site.appspot.com",
  messagingSenderId: "751655332891",
  appId: "1:751655332891:web:51c70c8b61a37d64239cbe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()

const auth = getAuth();

export const authWithGoogle = async () => {
    let user = null;

    await signInWithPopup(auth, provider)
    .then((result) => {
        user = result.user;
    })
    .catch(err => {
        console.log(err);
    })

    return user;
}