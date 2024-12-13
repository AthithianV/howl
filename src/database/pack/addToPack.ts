import { addDoc, arrayUnion, collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import db from "../firebase";
import { RefType } from "../../types/profile";
import { PackType } from "../../types/pack";

export async function addToPack(uid:string, addId:string){
    try {
        const pack = await getDocs(query(collection(db, 'packs'), where("uid", "==", uid)));
        if(pack.empty){
            const id = `${Date.now()}`;
            const pack:PackType = {uid: doc(db, 'users', uid), users: [doc(db, 'users', addId)], id};
            await setDoc(doc(db, 'packs', id), pack);
        }else{
            await updateDoc(doc(db, 'packs', pack.docs[0].data().id), {users: arrayUnion(doc(db, 'users', addId))});
        }        
    } catch (error) {
        throw error;
    }

}