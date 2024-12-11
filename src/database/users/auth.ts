import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import db, { app } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const auth = getAuth(app);
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