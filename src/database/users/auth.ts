import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import db, { app } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { getUserById } from "./getUser";

const auth = getAuth(app);

export const isLogggedIn = async () => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {          
          const uid = user.uid;
          console.log(uid);
          const userData = await getUserById(uid);
          console.log(userData);
        } else {
          // User is signed out
          // ...
        }
      });
}

export const signupWithEmailPassword = async (username: string, email:string, password: string) =>{
    try {
        const userRecord = await createUserWithEmailAndPassword(auth, email, password);
        const user = {userId: userRecord.user.uid, username, email};
        await addDoc(collection(db, 'users'), user);
    } catch (error) {
        console.log(error);
        
        throw error;    
    }
}

export const signInWithEmailPassword = async (email:string, password: string) =>{
  try {
      const userRecord = await signInWithEmailAndPassword(auth, email, password);
      console.log(userRecord);
      const user = {userId: userRecord.user.uid, email};
  } catch (error) {
      console.log(error);
      
      throw error;    
  }
}