import { GroupType } from '../../types/group'

const GroupCard = ({group, joined}:{group:GroupType, joined: boolean}) => {

  return (
    <div className={`p-2 px-4 flex justify-between items-center gap-0 hover:bg-slate-200 rounded cursor-pointer border-2 w-[250px]`}>
        <div className='flex flex-col'>
            <span className="font-semibold text-lg">{group.name}</span>
            <span className="font-semibold text-xs bg-red-500 text-white rounded px-1 py-[0.2px] w-fit">{group.theme}</span>
        </div>
        {
            joined?<span className='py-1 px-2 rounded text-white bg-stone-300'>Joined</span>
            :<button className='bg-black text-white h-fit py-1 px-2 rounded'>Join</button>
        }
    </div>
  )
}

export default GroupCard