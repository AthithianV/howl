import { z } from "zod";

import { ProfileFormSchema } from "../../validation/ProfileForm";
import { ProfileType } from "../../types/profile";
import db from "../firebase";
import { doc } from "firebase/firestore";


export const createProfile = async (data:z.infer<typeof ProfileFormSchema>, uid: string) => {

    console.log(data);
    
    const profile:ProfileType = {
        age: data.age,
        fullName: data.fullName,
        gender: data.gender==="DO NOT WANT TO SHARE"?null:data.gender,
        occupation: data.occupation,
        pictureUrl: data.pictureUrl,
        uid: doc(db, "users", uid),
    }
}