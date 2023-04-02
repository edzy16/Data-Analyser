// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmxUhLyQ4K1vzg8_nArh9Q5LhQdUbp5Js",
  authDomain: "data-analyser-7744f.firebaseapp.com",
  projectId: "data-analyser-7744f",
  storageBucket: "data-analyser-7744f.appspot.com",
  messagingSenderId: "724778584259",
  appId: "1:724778584259:web:10e0ed95ca39b87785fa76",
  measurementId: "G-EETWZXYGWB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
