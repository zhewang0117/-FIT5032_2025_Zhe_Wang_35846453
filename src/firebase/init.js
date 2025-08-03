// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP8eC2zmU4O8aHUgt2xZcRBX1H9zk4ZUM",
  authDomain: "zhewang35846453.firebaseapp.com",
  projectId: "zhewang35846453",
  storageBucket: "zhewang35846453.firebasestorage.app",
  messagingSenderId: "177225285320",
  appId: "1:177225285320:web:ed5087b5aa7f861f9f6ffd"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore()
export default db