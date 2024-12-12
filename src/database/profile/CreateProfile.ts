import { z } from "zod";

import { ProfileFormSchema } from "../../validation/ProfileForm";
import { ProfileType } from "../../types/profile";
import db from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { InterestType } from "../../types/interest";

const extractProfileInterest = (data:z.infer<typeof ProfileFormSchema>, uid: string)=>{
    

    const profile:ProfileType = {
        age: data.age?data.age:null,
        fullName: data.fullName,
        gender: !data.gender || data.gender==="DO NOT WANT TO SHARE"?null:data.gender,
        occupation: data.occupation?data.occupation:null,
        pictureUrl: data.pictureUrl,
        id: `${Date.now()}`
    }

    const interest:InterestType = {
        hobbies: data.hobbies?data.hobbies.split(","):[],
        foods: data.foods?data.foods.split(","):[],
        books: data.books?data.books.split(","):[],
        movies: data.movies?data.movies.split(","):[],
        animes: data.animes?data.animes.split(","):[],
        id: `${Date.now()}`
    }
    
    return [profile, interest];
}


export const createProfile = async (data:z.infer<typeof ProfileFormSchema>, uid: string) => {

    try {
        const [profile, interest] = extractProfileInterest(data, uid);
        await setDoc(doc(db, 'profiles', profile.id), profile);
        await setDoc(doc(db, 'interests', interest.id), interest);
        await setDoc(doc(db, "users", uid), {profileId: profile.id});
        await setDoc(doc(db, "users", uid), {interestId: interest.id});
    } catch (error) {
        throw error;
    }
}