import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import db from "../firebase";
import { MatchDocType, MatchedUser, MatchType } from "../../types/match";
import { UserType } from "../../types/user";
import { ProfileType } from "../../types/profile";

const getMatchingProfile = async (uid:string) => {
  const matches = await getDocs(query(collection(db, 'matches'), where('uid', '==', doc(db, 'users', uid))));
  let result:MatchedUser[] = await Promise.all(matches.docs.map(async (match)=>{
        const matchData:MatchDocType = match.data() as MatchDocType;
        const matchedUserDoc = await getDoc(matchData.matchedUid);
        const matchedUserData:UserType = matchedUserDoc.data() as UserType;
        const matchedUserProfileDoc = await getDoc(matchedUserData.profileId);
        const matchedProfileData:ProfileType = matchedUserProfileDoc.data() as ProfileType;
        return {
            matches: {
                hobbiesMatches: matchData.hobbiesMatches,
                booksMatches: matchData.booksMatches,
                animesMatches: matchData.animesMatches,
                moviesMatches: matchData.moviesMatches,
                foodsMatches: matchData.foodsMatches,
                ageMatch: matchData.ageMatch,
                genderMatch: matchData.genderMatch,
                occupationMatch: matchData.occupationMatch,
            },
            user: matchedUserData,
            profile: matchedProfileData as ProfileType,
        }
  }));
    return result;
}


export default getMatchingProfile;