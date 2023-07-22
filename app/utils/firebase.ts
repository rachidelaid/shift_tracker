import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcvaJ1rDXl9dQPPA7fL9NufFifQjCbbuQ",
  authDomain: "shifttracker-27b25.firebaseapp.com",
  projectId: "shifttracker-27b25",
  storageBucket: "shifttracker-27b25.appspot.com",
  messagingSenderId: "76334325464",
  appId: "1:76334325464:web:4e3202bd91eb04896741ad",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
