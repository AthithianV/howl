import { getDoc } from "firebase/firestore";
import { UserType } from "../../types/user";
import { ProfileType, RefType } from "../../types/profile";
import { InterestType } from "../../types/interest";
import { PersonalityType } from "../../types/personality";

export async function getUserData(userRef:RefType){

    try {
        const user = await getDoc(userRef);

        const userData = user.data() as UserType;

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
            personality: (personalityDoc?.exists() ? personalityDoc.data() : null) as PersonalityType,
            interest: (interestDoc?.exists() ? interestDoc.data() : null) as InterestType,
            profile: (profileDoc?.exists() ? profileDoc.data() : null) as ProfileType,
        };

        return populatedData;
    } catch (error) {
        console.log("Getting User Data:"+ JSON.stringify(error));
        throw error;
    }
}