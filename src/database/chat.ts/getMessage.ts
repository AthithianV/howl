import { and, collection, doc, getDocs, or, query, where } from "firebase/firestore";
import db from "../firebase";
import { MessageType } from "../../types/message";


export async function getMessages(uid1:string, uid2:string):Promise<MessageType[]>{
    try {
        const messagesSnap = await getDocs(
            query(
                collection(db, "messages"),
                or(
                    and(
                        where("sender", "==", doc(db, "users", uid1)),
                        where("receiver", "==", doc(db, "users", uid2)),
                    ),
                    and(
                        where("sender", "==", doc(db, "users", uid2)),
                        where("receiver", "==", doc(db, "users", uid1)),
                    )
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