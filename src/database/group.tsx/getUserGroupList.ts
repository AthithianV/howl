import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../firebase";
import { UserGroupList } from "../../types/UserGroupList";

export async function getUserGroupList(uid:string){
    const userGroups = await getDocs(query(collection(db, 'user_group_lists'), where('uid', '==', uid)));
    if(userGroups.empty){
        return [];
    }
    return (userGroups.docs[0].data() as UserGroupList).groups;
}