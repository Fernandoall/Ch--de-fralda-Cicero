// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwam1IVJZrq4p72mwxTpGeskdRh9xkSL0",
  authDomain: "chadefralda-49845.firebaseapp.com",
  projectId: "chadefralda-49845",
  storageBucket: "chadefralda-49845.firebasestorage.app",
  messagingSenderId: "388990084214",
  appId: "1:388990084214:web:784ff437d760f4e474ab57"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
