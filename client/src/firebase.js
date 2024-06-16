// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-ee8ba.firebaseapp.com",
  projectId: "real-estate-ee8ba",
  storageBucket: "real-estate-ee8ba.appspot.com",
  messagingSenderId: "190613408918",
  appId: "1:190613408918:web:4df02bfff0888ecf01c6b7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);