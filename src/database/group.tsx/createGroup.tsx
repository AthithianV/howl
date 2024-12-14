import { z } from "zod";
import { GroupFormSchema } from "../../validation/GroupForm";
import { GroupType } from "../../types/group";
import { collection, doc, getDocs, setDoc, where } from "firebase/firestore";
import db from "../firebase";


export async function createGroup(data:z.infer<typeof GroupFormSchema>, uid:string){
    try {
        const newgroup:GroupType = {
            id: `${Date.now()}`,
            members: [uid],
            createdBy: uid,
            createdAt: Date.now(),
            ...data
        }
        await setDoc(doc(db, 'groups', newgroup.id), newgroup);

    } catch (error) {
        throw error;
    }
}