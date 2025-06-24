// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ add

const firebaseConfig = {
  apiKey: "AIzaSyDGqt-iqno1hA5SuzGQpfGtCBcAYn9z4ZQ",
  authDomain: "fundwiz-website.firebaseapp.com",
  projectId: "fundwiz-website",
  storageBucket: "fundwiz-website.firebasestorage.app",
  messagingSenderId: "126833741973",
  appId: "1:126833741973:web:94075b70eec65156040b9c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // ✅ add this
