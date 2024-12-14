import { arrayUnion, collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import db from "../firebase";
import { ChatListType } from "../../types/chatlist";

async function addUsers(uid1:string, uid2:string){
    const chatListDoc = await getDocs(query(collection(db, 'chatlists'), where("uid", "==", doc(db, 'users', uid1))));
    if(chatListDoc.empty){
        const id = `${Date.now()}`;
        const chatList:ChatListType = {uid: doc(db, 'users', uid1), users: [doc(db, 'users', uid2)], id};
        await setDoc(doc(db, 'chatlists', id), chatList);
    }else{
        const userAlreadyAdded = await getDocs(
            query(
                collection(db, 'chatlists'), 
                where('uid', '==', doc(db, 'users', uid1)),
                where('users', 'array-contains', doc(db, 'users', uid2))
            ));
        if(userAlreadyAdded.empty){
            await updateDoc(doc(db, 'chatlists', chatListDoc.docs[0].data().id), {users: arrayUnion(doc(db, 'users', uid2))});
        }
    }
}

export async function addToChatList(uid1:string, uid2:string){
    try {
        addUsers(uid1, uid2);  
        addUsers(uid2, uid1);  
    } catch (error) {
        throw error;
    }

}