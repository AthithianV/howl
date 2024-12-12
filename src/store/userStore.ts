import { create } from "zustand"
import { UserType } from "../types/user"


type State = {
    user: UserType | null,
}

type Action = {
    setUser: (user:State["user"])=> void,
}

const useUser  = create<State & Action>((set)=>({
    user: null,
    setUser: (user)=>set(()=>({user}))
}))

export default useUser;