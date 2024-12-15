import { create } from "zustand"
import { UserType } from "../types/user"
import { ProfileType } from "../types/profile"
import { MessageType } from "../types/message"


type State = {
    chatList: {user:UserType, profile:ProfileType}[],
    selectedChat: string | null,
    messages: MessageType[],
    message: MessageType | null,
    displayPrompt: boolean,
    promptText: string,
}

type Action = {
    setChatList: (chatList:State["chatList"])=> void,
    setChat: (chat:State["selectedChat"])=> void,
    setMessages: (messages:State["messages"])=> void,
    setPromptDisplay: (message: State["displayPrompt"])=>void,
    setPromptText: (prompt:State["promptText"])=> void,

}

const useChat  = create<State & Action>((set)=>({
    chatList: [],
    setChatList: (chatList)=>set(()=>({chatList})),
    selectedChat: null,
    setChat: (chat)=>set(()=>({selectedChat: chat})),
    messages: [],
    message: null,
    setMessages: (messages)=>set(()=>({messages})),
    displayPrompt: true,
    setPromptDisplay: (view)=>set(()=>({displayPrompt: view})),
    promptText: "",
    setPromptText: (promptText) => set(()=>({promptText})),
}))

export default useChat;