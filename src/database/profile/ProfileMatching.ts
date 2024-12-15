import { getUserData } from "../users/GetUserData";
import { getUsersWithMatchingProfile } from "../../util/profiles/GetUsersWithMatchingProfiles";
import { RefType } from "../../types/profile";
import { getUsersWithMatchingInterests } from "../../util/profiles/GetUsersWithMatchingInterests";
import { and, collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import db from "../firebase";
import { MatchDocType } from "../../types/match";
import findCommonInterests from "../../util/profiles/findCommonInterest";



export const matchProfile = async (uid:string)=>{
    try {
        const {user, profile, interest} = await getUserData(doc(db, 'users', uid));

        let matches:RefType[] = [];
        if(profile){
            const profileMatches = await getUsersWithMatchingProfile(profile);
            matches = profileMatches;
        }

        

        if(interest){
            const interestMatches = await getUsersWithMatchingInterests(interest);
            interestMatches.forEach(match => {
                if (!matches.some(existingMatch => existingMatch.id===match.id)) {
                    matches.push(match);
                }
            });
        }        

        const matchIds = await Promise.all(matches.map(async (match:RefType)=>{
            
            const checkMatchedExistence = await getDocs(
                query(
                    collection(db, "matches"), 
                    and(
                        where("matchedUid", "==", match),
                        where("uid", "==", doc(db, 'users', uid))
                    )
                )
            )

            if(!checkMatchedExistence.empty){
                return null;
            }

            const {
                profile:matchedProfile,
                interest: matchedInterest,
            } = await getUserData(match);

            const matchData:MatchDocType = {
                hobbiesMatches: findCommonInterests(interest.hobbies, matchedInterest.hobbies),
                booksMatches: findCommonInterests(interest.books, matchedInterest.books),
                animesMatches: findCommonInterests(interest.animes, matchedInterest.animes),
                moviesMatches: findCommonInterests(interest.movies, matchedInterest.movies),
                foodsMatches: findCommonInterests(interest.foods, matchedInterest.foods),
                ageMatch: matchedProfile.age && profile.age ?matchedProfile.age <= profile.age+2 || matchedProfile.age >= profile.age-2:false,
                genderMatch: matchedProfile.gender && profile.gender ?matchedProfile.gender === profile.gender:false,
                occupationMatch: matchedProfile.occupation && profile.occupation ?matchedProfile.occupation === profile.occupation:false,
                id: `${Date.now()}`,
                matchedUid: match,
                uid: profile.uid,
            }
            
            await setDoc(doc(db, 'matches', matchData.id), matchData);
            return matchData.id;
        }))

        let matchCount = 0;
        matchIds.forEach((match)=>{
            if(match){
                matchCount++;
            }
        })
        

        await updateDoc(profile.uid, {matchedProfileCount: user.matchedProfileCount+matchCount})

        return {matchCount, user: {...user, matchedProfileCount: user.matchedProfileCount+matchCount}};
        
    } catch (error) {
        console.log(error);
        
        throw error;
    }
} 