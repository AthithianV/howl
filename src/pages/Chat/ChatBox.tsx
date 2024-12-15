import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import InputBox from '../../components/Chat/InputBox'
import useChat from '../../store/chatStore';
import useUser from '../../store/userStore';
import { getMessages } from '../../database/chat/getMessage';
import { MessageType } from '../../types/message';
import { toast } from 'react-toastify';
import LoaderWrapper from '../../components/ui/LoaderWrapper';
import { ThreeDots } from 'react-loader-spinner';
import Message from '../../components/Chat/Message';
import PromptBox from '../../components/Chat/PromptBox';


const ChatBox = () => {

  const { userId } = useParams();
  const {user} = useUser();
  const { setChat, displayPrompt, setPromptDisplay } = useChat();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loader, setLoader] = useState(false);

    useEffect(()=>{
        if(userId && user){
            setLoader(true);
            setChat(userId);
            Promise.resolve(getMessages(user.uid, userId))
            .then((res:MessageType[])=>setMessages(res))
            .catch(()=>toast.error("Something Went Wrong"))
            .finally(()=>setLoader(false));
        }
    }, [userId]);

    useEffect(()=>{
      if(messages.length===0){
        setPromptDisplay(true);
      }else{
        setPromptDisplay(false);
      }
    }, [messages]);

  return (
    <div className='py-5 px-10 flex flex-col gap-1 h-screen min-w-[400px] relative box-border overflow-hidden'>
      <div className='relative'>
        {displayPrompt && messages && messages.length===0 && <PromptBox />}
      </div>
      {
        loader
        ?<LoaderWrapper><ThreeDots color='#38bdf8'/></LoaderWrapper>
        :<div className='flex-1 flex flex-col overflow-auto'>
          {messages.map((message, index)=>(
            user && 
              <div key={index} className={`${message.sender.id===user.uid?"self-end":"self-start"}`}>
                <Message 
                  text={message.text} 
                  time={message.time}
                  user={message.sender.id===user.uid}
                  />
              </div>
            ))}
        </div>
      }
      <InputBox messages={messages} setMessages={setMessages}/>
    </div>
  )
}

export default ChatBox;