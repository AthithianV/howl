import GroupMessageListBox from './GroupMessageListBox';
import GroupInputBox from './GroupInputBox';
import { useEffect, useState } from 'react';
import { GroupMessageType } from '../../types/groupMessage';
import getGroupMessages from '../../database/group.tsx/getGroupMessages';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GroupType } from '../../types/group';
import getGroup from '../../database/group.tsx/getGroup';

const GroupChatBox = () => {

  const [loader, setLoader] = useState(false);
  const [messages, setMessages] = useState<GroupMessageType[]>([]);
  const [group, setGroup] = useState<GroupType|null>(null);
  const {groupId} = useParams();

  useEffect(()=>{
    if(groupId){
      setLoader(true);
      Promise.resolve()
      Promise.resolve(getGroupMessages(groupId))
      .then((res)=>setMessages(res))
      .catch(()=>toast.error("Something Went Wrong"))
      Promise.resolve(getGroup(groupId))
      .then((res)=>setGroup(res))
      .catch(()=>toast.error("Something Went Wrong"))
      .finally(()=>setLoader(false));
      
    }
  },[])

  return (
    <div className='h-full w-full m-auto bg-white border-2 shadow rounded-lg flex flex-col'>
        {group && <div className='bg-stone-200 py-4 px-8 flex flex-col gap-1'>
          <span className='text-xl logo-font font-bold'>{group.name}</span>
          <span className='text-sm text-white font-semibold bg-sky-400 w-fit rounded px-1'>{group.theme}</span>
        </div>}
        <div className='p-8 flex-1 flex flex-col'>
          <GroupMessageListBox messages={messages} loader={loader} />
          <GroupInputBox messages={messages} setMessages={setMessages} />
        </div>
    </div>
  )
}

export default GroupChatBox;