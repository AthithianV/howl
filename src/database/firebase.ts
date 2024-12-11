// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7932kRvtnwWPhXLyZ8IN30alnvrq6CAA",
  authDomain: "introtalk-d1653.firebaseapp.com",
  projectId: "introtalk-d1653",
  storageBucket: "introtalk-d1653.firebasestorage.app",
  messagingSenderId: "19562086941",
  appId: "1:19562086941:web:93b69bd249169b9ff3bcf4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;