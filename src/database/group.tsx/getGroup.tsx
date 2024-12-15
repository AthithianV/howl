import { doc, getDoc } from "firebase/firestore";
import db from "../firebase";
import { GroupType } from "../../types/group";

const getGroup = async (groupId:string) => {
    try {
        const groupSnap = await getDoc(doc(db, 'groups', groupId));
        return groupSnap.data() as GroupType;
    } catch (error) {
        throw error;
    }
}

export default getGroup