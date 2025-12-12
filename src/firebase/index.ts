// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoZFDZ5ej0NmOWlzVK-Y2rMfcH-kY5ToU",
  authDomain: "tab0-1e6b5.firebaseapp.com",
  projectId: "tab0-1e6b5",
  storageBucket: "tab0-1e6b5.firebasestorage.app",
  messagingSenderId: "113497991910",
  appId: "1:113497991910:web:77cf64897a5a7eb8bb2927"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)