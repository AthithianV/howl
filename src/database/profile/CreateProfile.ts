import { z } from "zod";

import { ProfileFormSchema } from "../../validation/ProfileForm";
import { ProfileType } from "../../types/profile";
import db from "../firebase";
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { InterestType } from "../../types/interest";
import { UserType } from "../../types/user";

const extractProfileInterest = (data:z.infer<typeof ProfileFormSchema>, uid: string)=>{
    

    const profile:ProfileType = {
        age: data.age?data.age:null,
        fullName: data.fullName,
        gender: !data.gender || data.gender==="DO NOT WANT TO SHARE"?null:data.gender,
        occupation: data.occupation?data.occupation:null,
        pictureUrl: data.pictureUrl,
        id: `${Date.now()}`,
        uid: doc(db, "users", uid)
    }

    const interest:InterestType = {
        hobbies: data.hobbies?data.hobbies.split(","):[],
        foods: data.foods?data.foods.split(","):[],
        books: data.books?data.books.split(","):[],
        movies: data.movies?data.movies.split(","):[],
        animes: data.animes?data.animes.split(","):[],
        id: `${Date.now()}`,
        uid: doc(db, "users", uid)
    }
    
    return [profile, interest];
}


export const createProfile = async (data:z.infer<typeof ProfileFormSchema>, uid: string):Promise<UserType|null> => {

    try {
        const userRef = doc(db, 'users', uid);
        const profileExists = await getDocs(query(collection(db, "profiles"), where('uid', "==", userRef)));
        if(!profileExists.empty){
            return null;
        }
        const [profile, interest] = extractProfileInterest(data, uid);
        await setDoc(doc(db, 'profiles', profile.id), profile);
        await setDoc(doc(db, 'interests', interest.id), interest);
        await updateDoc(
            doc(db, 'users', uid), 
            {
                profileId: doc(db, 'profiles', profile.id), 
                interestId: doc(db, 'interests', interest.id),
                hasProfile: true
            });
        const user = await getDoc(userRef);
        return user.data() as UserType;

    } catch (error) {
        throw error;
    }
}