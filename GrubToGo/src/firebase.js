// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwDFv2nCcrtIBxHpDWahUOL59lEk1APHM",
  authDomain: "cs-491-62e8a.firebaseapp.com",
  projectId: "cs-491-62e8a",
  storageBucket: "cs-491-62e8a.firebasestorage.app",
  messagingSenderId: "443238832799",
  appId: "1:443238832799:web:54d48929e0c48921e920aa",
  measurementId: "G-E57T2S19L6"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Get Authentication instance
export const auth = getAuth(app);

// ✅ Get Firestore instance
export const db = getFirestore(app);

// (Optional) export app if needed elsewhere
export default app;