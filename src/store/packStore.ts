import { create } from "zustand"
import { UserType } from "../types/user"
import { ProfileType } from "../types/profile"


type State = {
    pack: {user:UserType, profile:ProfileType}[],
    selectedPack: string | null,
}

type Action = {
    setPack: (pack:State["pack"])=> void,
    setSelectedPack: (pack:State["selectedPack"])=> void,
}

const usepack  = create<State & Action>((set)=>({
    pack: [],
    setPack: (pack)=>set(()=>({pack})),
    selectedPack: null,
    setSelectedPack: (selectedPack)=>set(()=>({selectedPack}))
}))

export default usepack;