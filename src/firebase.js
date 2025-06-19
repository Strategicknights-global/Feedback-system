// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_LlG7A66VusG9Lt01kvTnjCTOTUrl1eg",
  authDomain: "feedback-14f0d.firebaseapp.com",
  projectId: "feedback-14f0d",
  storageBucket: "feedback-14f0d.firebasestorage.app",
  messagingSenderId: "580893389642",
  appId: "1:580893389642:web:bdb7c73e8e1cde932e87b3",
  measurementId: "G-LJ8SMN1J12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);    

export const db = firestore;