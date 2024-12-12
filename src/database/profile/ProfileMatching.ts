import { doc, getDoc } from "firebase/firestore";
import db from "../firebase";


export const matchProfile = async (uid:string)=>{
    try {
        const user = await getDoc(doc(db, "users", uid));

        const userData = user.data();

        if(!userData){
            throw new Error("User Does not exists");
        }

        const personalityDocRef = userData.personalityId;
        const interestDocRef = userData.interestId;
        const profileDocRef = userData.profileId;

        // Fetch related documents using the references
        const personalityDoc = personalityDocRef ? await getDoc(personalityDocRef) : null;
        const interestDoc = interestDocRef ? await getDoc(interestDocRef) : null;
        const profileDoc = profileDocRef ? await getDoc(profileDocRef) : null;

        const populatedData = {
            user: userData,
            personality: personalityDoc?.exists() ? personalityDoc.data() : null,
            interest: interestDoc?.exists() ? interestDoc.data() : null,
            profile: profileDoc?.exists() ? profileDoc.data() : null,
        };

        console.log(populatedData);
        
    } catch (error) {
        throw error;
    }
} 