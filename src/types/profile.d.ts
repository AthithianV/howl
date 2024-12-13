export type RefType = DocumentReference<DocumentData, DocumentData>;

export type ProfileType = {
    age: number | null,
    fullName: string
    gender: "MALE" | "FEMALE" | "OTHERS" | null,
    occupation: string | null,
    pictureUrl: string | null,
    id:string,
    uid: RefType,
}