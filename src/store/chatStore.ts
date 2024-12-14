import { create } from "zustand"
import { UserType } from "../types/user"
import { ProfileType } from "../types/profile"
import { MessageType } from "../types/message"


type State = {
    chatList: {user:UserType, profile:ProfileType}[],
    selectedChat: string | null,
    messages: MessageType[],
    message: MessageType | null
}

type Action = {
    setChatList: (chatList:State["chatList"])=> void,
    setChat: (chat:State["selectedChat"])=> void,
    setMessages: (messages:State["messages"])=> void,
    addMessage: (message: State["message"])=>void
}

const useChat  = create<State & Action>((set)=>({
    chatList: [],
    setChatList: (chatList)=>set(()=>({chatList})),
    selectedChat: null,
    setChat: (chat)=>set(()=>({selectedChat: chat})),
    messages: [],
    message: null,
    setMessages: (messages)=>set(()=>({messages})),
    addMessage: (message) => set((state)=>{
        if(message)
            return {messages: [message, ...state.messages]};
        else{
            return {messages: state.messages};
        }
    })
}))

export default useChat;