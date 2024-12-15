import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../firebase";
import { GroupMessageType } from "../../types/groupMessage";

const getGroupMessages = async (groupId:string) => {
  try{
    console.log(groupId);
    
    const groupMessageSnap = await getDocs(query(collection(db, 'group_messages'), where('groupId', '==', groupId)));
    const groupMessages:GroupMessageType[] =[];
    groupMessageSnap.forEach(message=>groupMessages.push(message.data() as GroupMessageType));
    console.log(groupMessages);
    return groupMessages;
  }catch(err){
    console.log(err);
    
    throw err;
  }
}

export default getGroupMessages