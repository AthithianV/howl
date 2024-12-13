import { and, collection, getDocs, or, query, where } from "firebase/firestore";
import { ProfileType, RefType } from "../../types/profile";
import db from "../../database/firebase";

export async function getUsersWithMatchingProfile(profile:ProfileType):Promise<RefType[]>{


    try {
        const ageFilter = profile.age 
            ? and(
                where('age', '<=', profile.age + 2), 
                where('age', '>=', profile.age-2)
            ):where('age', '==', null);
    
        const occupationFilter = profile.occupation 
            ?where('occupation', '==', profile.occupation)
            :where('occupation', '==', null);
        
        const genderFilter = profile.gender
            ?where('gender', '==', profile.gender)
            :where('gender', '==', null);

        const q = query(collection(db, "profiles"), 
            and(or(
                ageFilter,
                occupationFilter,
                genderFilter
            ), where('uid', "!=", profile.uid))
        )
        const matchingProfileDoc = await getDocs(q);

        let matchingProfileIds:string[] = [];
        if(matchingProfileDoc.empty){
            return matchingProfileIds;
        }
        
        matchingProfileDoc.forEach(doc=>{
            const data = doc.data();
            matchingProfileIds.push(data.uid);
        })

        return matchingProfileIds;
    } catch (error) {
        console.log("Matching Profile:"+ JSON.stringify(error));
        throw error;
    }
} 