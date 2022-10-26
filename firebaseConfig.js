// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, onSnapshot, getDocs, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3Ai4CR3Rxim8hYpP2P-g5E_6Nc9cGEOE",
  authDomain: "likehome-36ffe.firebaseapp.com",
  projectId: "likehome-36ffe",
  storageBucket: "likehome-36ffe.appspot.com",
  messagingSenderId: "213928354102",
  appId: "1:213928354102:web:0c691228b048d9a88b9397",
  measurementId: "G-TL2KL68ST7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default  getFirestore(app);




