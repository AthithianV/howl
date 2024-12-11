import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../firebase";


export const getUserById = async (userId: string)=>{
    try{
        const docSnap = await getDocs(query(collection(db, "users"), where('userId', "==", userId)));
        if(docSnap.empty){
            throw new Error("User Does not exists");
        }else{
            docSnap.forEach(user=>{
                return user.data();
            })
        }
    }catch(error){
        throw error;
    }
}