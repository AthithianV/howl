import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import db, { app } from "../firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { UserType } from "../../types/user";

const auth = getAuth(app);
export const signupWithEmailPassword = async (username: string, email:string, password: string) =>{
    try {
        const userRecord = await createUserWithEmailAndPassword(auth, email, password);
        const user = {userId: userRecord.user.uid, username, email, hasProfile: false};
        await addDoc(collection(db, 'users'), user);
    } catch (error) {
        throw error;    
    }
}

export const loginWithEmailPassword = async ( email:string, password: string) =>{
    try {
        const userRecord = await signInWithEmailAndPassword(auth, email, password);
        let user:UserType|null = null;
        const docsSnap = await getDocs(query(collection(db, 'users'), where("userId", "==", userRecord.user.uid)));
        if(!docsSnap.empty){
            docsSnap.forEach(doc=>{
                user = doc.data() as UserType;
            })
        }
        return user;
    } catch (error) {
        console.log(error);
        
        throw error;    
    }
}

export const signOutInt = async () =>{
    signOut(auth).catch((error) => {
        throw new Error("Error Occured while signing out!!!");
    });
} 