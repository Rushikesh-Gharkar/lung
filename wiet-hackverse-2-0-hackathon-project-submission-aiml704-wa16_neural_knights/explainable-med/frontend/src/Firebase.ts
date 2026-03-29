// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-k9qxDmR3Zd5_KuDqzDfbiGt4EdazsuU",
  authDomain: "medisense-3f506.firebaseapp.com",
  databaseURL: "https://medisense-3f506-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "medisense-3f506",
  storageBucket: "medisense-3f506.firebasestorage.app",
  messagingSenderId: "469842453971",
  appId: "1:469842453971:web:744a6663ac0901bd4a3b26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);

export default app;