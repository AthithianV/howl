
export type ProfileType = {
    age: number | null,
    fullName: string
    gender: "MALE" | "FEMALE" | "OTHERS" | null,
    occupation: string | null,
    pictureUrl: string | null,
    uid: DocumentReference<DocumentData, DocumentData>,
}