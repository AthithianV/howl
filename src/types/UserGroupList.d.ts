import { RefType } from "./profile"

export type UserGroupList = {
    uid: RefType,
    groups: string[],
    id: string
}