import { collection, doc, getDocs, query, where } from "firebase/firestore";
import db from "../firebase";
import { ProfileType } from "../../types/profile";


export async function getProfile(uid:string){
    try {
        const profileSnap = await getDocs(query(collection(db, 'profiles'), where("uid", "==", doc(db, "users", uid))));

        return profileSnap.docs[0].data() as ProfileType;
    } catch (error) {
        console.log(error);
        
        throw error;
    }   
}