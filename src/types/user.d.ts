import { RefType } from "./profile"

export type UserType = {
    email: string,
    username: string,
    userId: string,
    hasProfile: boolean,
    matchedProfileCount: number,
    profileId: RefType | null,
    interestId: RefType | null,
    personalityId: RefType | null,
    uid: string
}