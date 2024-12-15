import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useUser from '../../store/userStore'
import useChat from '../../store/chatStore';
import { FormEvent, useEffect, useState } from 'react';
import { sendMessage } from '../../database/chatList/sendMessage';
import { Discuss } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MessageType } from '../../types/message';

type PropType = {
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>,
    messages: MessageType[]
}

const InputBox = ({messages, setMessages}: PropType) => {

    const {user} = useUser();
    const {selectedChat, setChat, promptText} = useChat();
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    const { userId } = useParams();

    useEffect(()=>{
        if(userId)  
            setChat(userId);
    }, [])

    useEffect(()=>{
        if(promptText){
            setMessage(promptText);
        }
    }, [promptText]);

    const handleSubmission = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoader(true);
        try {
            if(selectedChat && user){
                const messageDoc = await sendMessage(message, user.uid, selectedChat);
                setMessages([...messages, messageDoc]);
                setMessage("");
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

export default InputBox;