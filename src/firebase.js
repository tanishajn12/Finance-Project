// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAutkhn1d3gJ-w9prSBr3Dhivk-URvFqlQ",
  authDomain: "savemate-7e8e3.firebaseapp.com",
  projectId: "savemate-7e8e3",
  storageBucket: "savemate-7e8e3.appspot.com",
  messagingSenderId: "109295375900",
  appId: "1:109295375900:web:d6b212017201972472f1d9",
  measurementId: "G-9ZL32YDHY6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };
