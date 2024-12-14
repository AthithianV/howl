import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import db, { app } from "../firebase";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { UserType } from "../../types/user";

const auth = getAuth(app);
export const signupWithEmailPassword = async (username: string, email:string, password: string) =>{
    try {
        const userRecord = await createUserWithEmailAndPassword(auth, email, password);
        const uid = `${Date.now()}`;
        const user:UserType = {
            userId: userRecord.user.uid,
            username,
            email,
            hasProfile: false,
            uid,
            matchedProfileCount: 0,
            profileId: null,
            interestId: null,
            personalityId: null
        };
        await setDoc(doc(db, "users", uid), user);
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
    signOut(auth).catch(() => {
        throw new Error("Error Occured while signing out!!!");
    });
} 