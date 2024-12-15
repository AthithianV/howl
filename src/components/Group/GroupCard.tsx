import { MouseEvent, useState } from 'react';
import { GroupType } from '../../types/group'
import { toast } from 'react-toastify';
import { joinGroup } from '../../database/group.tsx/joinGroup';
import useUser from '../../store/userStore';

const GroupCard = ({group, joined}:{group:GroupType, joined: boolean}) => {

  const [justJoined, setJustJoined] = useState(false);
  const {user} = useUser();

  async function joinGroupAction(e:MouseEvent<HTMLButtonElement, MouseEvent>){
    e.preventDefault(); 
    e.stopPropagation();
    try {
      if(user){
        await joinGroup(user.uid, group.id);
        setJustJoined(true);
      }
    } catch{
      toast.error("Something Went wrong")
    }
  }

  return (
    <div className={`p-2 px-4 flex justify-between items-center gap-0 hover:bg-slate-200 rounded cursor-pointer border-2 w-[250px]`}>
        <div className='flex flex-col'>
            <span className="font-semibold text-lg">{group.name}</span>
            <span className="font-semibold text-xs bg-red-500 text-white rounded px-1 py-[0.2px] w-fit">{group.theme}</span>
        </div>
        {
            (joined || justJoined) ?<span className='py-1 px-2 rounded text-white bg-stone-300'>Joined</span>
            :<button onClick={(e)=>joinGroupAction(e)} className='bg-black text-white h-fit py-1 px-2 rounded'>Join</button>
        }
    </div>
  )
}

export default GroupCard