import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC88nVwvOnUpHuFvCSHYNu3Yqdgk_OsRRM",
    authDomain: "sql-demo-ae1d6.firebaseapp.com",
    projectId: "sql-demo-ae1d6",
    storageBucket: "sql-demo-ae1d6.appspot.com",
    messagingSenderId: "744521824679",
    appId: "1:744521824679:web:7a75f39fcd1a2246671e82",
    measurementId: "G-Q1W9W63E2K"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
 
const googleAuthProvider = new GoogleAuthProvider();
 
export{
    analytics,
    db,
    googleAuthProvider
}
 