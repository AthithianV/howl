import { doc, setDoc } from "firebase/firestore";
import db from "../firebase";
import { MessageType } from "../../types/message";


export async function sendMessage(text:string, sender:string, receiver: string){
    const messageDoc:MessageType = {
            text,
            time: Date.now(),
            id: `${Date.now()}`,
            sender: doc(db, 'users', sender),
            receiver: doc(db, 'users', receiver),
        }
    
    try {
        await setDoc(doc(db, 'messages', messageDoc.id), messageDoc);
        return messageDoc;
    } catch (error) {
        throw error;   
    }
}