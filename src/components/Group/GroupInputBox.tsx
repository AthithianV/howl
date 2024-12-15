import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useUser from '../../store/userStore'
import { FormEvent, useState } from 'react';
import { Discuss } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addGroupMessage } from '../../database/group.tsx/addGroupMessage';
import { GroupMessageType } from '../../types/groupMessage';

type PropType = {
    messages: GroupMessageType[],
    setMessages: React.Dispatch<React.SetStateAction<GroupMessageType[]>>
}

const GroupInputBox = ({messages, setMessages}:PropType) => {

    const {user} = useUser();
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    const { groupId } = useParams();

    const handleSubmission = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoader(true);
        try {
            if(groupId && user){
                const newMessage = await addGroupMessage(message, user, groupId);
                setMessage("");
                setMessages([...messages, newMessage])
            }
        } catch (error) {
            toast.error("Somthing Went Wrong!");
        }
        finally{
            setLoader(false)
        }

    }

  return (
    <form 
        onSubmit={(e)=>handleSubmission(e)} 
        className='w-full flex-center px-5 py-2 rounded-md border-2 bg-gray-100 focus-within:border-sky-400'
    >
        <input 
            type="text" 
            className='focus:outline-none flex-1 bg-transparent'
            onChange={(e)=>setMessage(e.target.value)}
            value={message}
        />
        <div>
            <button
                type='submit'
                className='flex-center gap-1 text-white text-xl logo-font bg-sky-400 p-2 rounded shadow'
            >
                {loader
                ?<Discuss
                    visible={true}
                    height="25"
                    width="25"
                    colors={["white", "white"]}
                    />
                :<FontAwesomeIcon icon={faPaperPlane}/>}
            </button>
        </div>
    </form>
  )
}

export default GroupInputBox;