import { arrayUnion, collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import db from "../firebase";
import { UserGroupList } from "../../types/UserGroupList";

export async function joinGroup(uid: string, groupId:string){
    try {
        const userGroups = await getDocs(query(collection(db, 'user_group_lists'), where('uid', '==', uid)));
        if(userGroups.empty){
            const groupList:UserGroupList = {
                id: `${Date.now()}`,
                groups: [groupId],
                uid
            }
            await setDoc(doc(db, 'user_group_lists', groupList.id), groupList);
        }else{
            await updateDoc(doc(db, 'user_group_lists', userGroups.docs[0].id), {groups: arrayUnion(groupId)})
        }

        const isGroupMember = await getDocs(query(collection(db, 'groups'), where('members', 'array-contains', [uid])));
        
        
    } catch (error) {
        throw error;
    }
}