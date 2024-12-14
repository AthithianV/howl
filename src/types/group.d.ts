import { RefType } from "./profile"

export type GroupType = {
    name: string,
    description: string,
    theme: string,
    members: string[],
    id: string,
    createdBy: string,
    createdAt: number
}