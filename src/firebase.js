import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "blog-1dd87.firebaseapp.com",
  projectId: "blog-1dd87",
  storageBucket: "blog-1dd87.appspot.com",
  messagingSenderId: "93077794421",
  appId: "1:93077794421:web:45f70b8999027178b3523c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app) ; 
