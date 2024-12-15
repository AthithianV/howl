import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { UserType } from "../../types/user";
import db from "../firebase";
import { ProfileType } from "../../types/profile";
import { GroupMessageType } from "../../types/groupMessage";

export async function addGroupMessage(text:string, user:UserType, groupId:string){
    try {
        const profileSnap = await getDocs(query(collection(db, 'profiles'), where('uid', '==', doc(db, 'users', user.uid))));
        const profile = profileSnap.docs.length > 0 
        ? (profileSnap.docs[0].data() as ProfileType) 
        : null;

        if(!profile){
            throw new Error("Profile Does not Exists");
        }

        const message:GroupMessageType = {
            id: `${Date.now()}`,
            groupId,
            sender: user.uid,
            senderName: user.username,
            senderPicture: profile.pictureUrl as string,
            text,
            time: Date.now()
        }

        await setDoc(doc(db, 'group_messages', message.id), message);
        return message;
    } catch (error) {
        throw error;
    }
}