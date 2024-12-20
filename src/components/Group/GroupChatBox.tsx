import GroupMessageListBox from './GroupMessageListBox';
import GroupInputBox from './GroupInputBox';
import { useEffect, useState } from 'react';
import { GroupMessageType } from '../../types/groupMessage';
import getGroupMessages from '../../database/group.tsx/getGroupMessages';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GroupType } from '../../types/group';
import getGroup from '../../database/group.tsx/getGroup';
import useUser from '../../store/userStore';

const GroupChatBox = () => {

  const [loader, setLoader] = useState(false);
  const [messages, setMessages] = useState<GroupMessageType[]>([]);
  const [group, setGroup] = useState<GroupType|null>(null);
  const {groupId} = useParams();
  const {user} =useUser();
  const navigate = useNavigate();

  useEffect(()=>{
    if(groupId && user){
      setLoader(true);
      Promise.resolve(getGroup(groupId))
      .then((res)=>{
        if(!res.members.includes(user.uid)){
          toast.error("Please Join the Group to Chat");
          navigate("/group");
        }
        setGroup(res)
      })
      .catch(()=>toast.error("Something Went Wrong"));
      
      Promise.resolve(getGroupMessages(groupId))
      .then((res)=>setMessages(res))
      .catch(()=>toast.error("Something Went Wrong"))
      .finally(()=>setLoader(false));
      
    }
  },[user]);

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