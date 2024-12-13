import { ProfileType, RefType } from "./profile";
import { UserType } from "./user";

export type MatchDocType = {
    id:string,
    matchedUid: RefType,
    uid: RefType,
} & MatchType;

export type MatchType = {
    hobbiesMatches: string[],
    booksMatches: string[],
    animesMatches: string[],
    moviesMatches: string[],
    foodsMatches: string[],
    ageMatch: boolean,
    genderMatch: boolean,
    occupationMatch: boolean,
}

export type MatchedUser = {
    matches: MatchType,
    user: UserType,
    profile: ProfileType
}