import { RefType } from "./profile"

type GroupMessageType = {
    id:string,
    sender: string,
    groupId: string,
    senderName: string,
    senderPicture:string,
    text: string,
    time: number
}