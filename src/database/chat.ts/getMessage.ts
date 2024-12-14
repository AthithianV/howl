import { collection, doc, getDocs, or, query, where } from "firebase/firestore";
import db from "../firebase";
import { MessageType } from "../../types/message";


export async function getMessages(uid1:string, uid2:string):Promise<MessageType[]>{
    try {
        const messagesSnap = await getDocs(
            query(
                collection(db, "messages"),
                or(
                    where("sender", "==", doc(db, "users", uid1)),
                    where("recieve", "==", doc(db, "users", uid2)),
                    where("sender", "==", doc(db, "users", uid2)),
                    where("recieve", "==", doc(db, "users", uid1)),
                )
            )
        )
        let messages:MessageType[] = [];
        messagesSnap.forEach(messagesDoc=>{
            messages.push(messagesDoc.data() as MessageType);
        })
        return messages;
    } catch (error) {
        throw error;
    }
}