export type UserType = {
    email: string,
    username: string,
    userId: string,
    hasProfile: boolean,
    matchedProfileCount: number,
    profileId: DocumentReference<DocumentData, DocumentData> | null,
    interestId: DocumentReference<DocumentData, DocumentData> | null,
    personalityId: DocumentReference<DocumentData, DocumentData> | null,
    uid: string
}