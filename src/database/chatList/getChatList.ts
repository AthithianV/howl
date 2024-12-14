import { collection, doc, getDocs, query, where } from "firebase/firestore";
import db from "../firebase";
import { getUserData } from "../users/GetUserData";
import { ProfileType, RefType } from "../../types/profile";
import { UserType } from "../../types/user";


export async function getChatList(uid:string):Promise<{user: UserType, profile: ProfileType}[]>{
    try{
        const chatListSnap = await getDocs(query(collection(db, 'chatlists'), where('uid', '==', doc(db, 'users', uid))));
        if(chatListSnap.empty){
            return [];
        }
        const result = await Promise.all(chatListSnap.docs[0].data().users.map(async (userRef:RefType)=>{
            const {user, profile} = await getUserData(userRef);
            return {
                user, profile
            }
        }))

        return result;
    }catch(error){
        throw error;
    }
}