import { z } from "zod";
import { GroupFormSchema } from "../../validation/GroupForm";
import { GroupType } from "../../types/group";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import db from "../firebase";
import { joinGroup } from "./joinGroup";


export async function createGroup(data:z.infer<typeof GroupFormSchema>, uid:string){
    try {
        const checkGroup = await getDocs(query(collection(db, 'groups'), where('name', '==', data.name)));
        if(!checkGroup.empty){
            throw new Error("Group Name Exists")
        }
        const newgroup:GroupType = {
            id: `${Date.now()}`,
            members: [uid],
            createdBy: uid,
            createdAt: Date.now(),
            ...data
        }
        await setDoc(doc(db, 'groups', newgroup.id), newgroup);
        await joinGroup(uid, newgroup.id);
    } catch (error) {
        throw error;
    }
}