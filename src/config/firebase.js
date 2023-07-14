import { initializeApp } from "firebase/app";
import App from "../App";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD2nTLIcFKJ1HGN5p6vLZVPlLEJpzCyZ88",
  authDomain: "gbapp-e3820.firebaseapp.com",
  projectId: "gbapp-e3820",
  storageBucket: "gbapp-e3820.appspot.com",
  messagingSenderId: "921751227932",
  appId: "1:921751227932:web:09d482920af37eaa9399d9",
  measurementId: "G-VZLQC0X7C1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

