import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";
import { GroupType } from "../../types/group";

export async function getGroups(){
    const groupsDoc = await getDocs(collection(db, 'groups'));
    let groups:GroupType[] = [];
    groupsDoc.forEach(group=>groups.push(group.data() as GroupType));
    return groups;
}