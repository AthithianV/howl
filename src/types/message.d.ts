import { RefType } from "./profile"

type MessageType = {
    id:string,
    sender: RefType,
    receiver: RefType,
    text: string,
    time: number
}