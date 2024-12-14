import { RefType } from "./profile"

export type GroupType = {
    name: string,
    description: string,
    theme: string,
    members: string[],
    id: RefType,
    createdBy: string,
    createdAt: number
}