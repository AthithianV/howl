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
import { getProfile } from '../../database/profile/getProfile';
import { ProfileType } from '../../types/profile';

const ChatBox = () => {

  const { userId } = useParams();
  const {user} = useUser();
  const [profile, setProfile] = useState<ProfileType>();
  const { setChat, displayPrompt, setPromptDisplay } = useChat();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loader, setLoader] = useState(false);

    useEffect(()=>{
        if(userId && user){
            setLoader(true);
            setChat(userId);
            Promise.resolve(getProfile(userId))
            .then((res)=>setProfile(res))
            .catch(()=>toast.error("Something Went Wrong"));

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
    <div className='flex flex-col gap-1 h-screen relative box-border overflow-hidden'>
      {
        profile && 
        <div className='px-5 py-2 flex justify-start items-center gap-2 bg-slate-200'>
          <div className="p-2 rounded-full border-2 border-black bg-white hover:border-sky-400 shadow w-fit">
              <img 
              src={profile.pictureUrl as string}
              alt={profile.fullName}
              className={`h-8 w-8`}
              />
          </div>
          <h1 className='logo-font text-xl'>{profile.fullName}</h1>
        </div>
      }
      <div className='px-10 max-md:px-5 flex flex-col flex-1'>
        <div className='relative'>
          {displayPrompt && messages && messages.length===0 && <PromptBox messages={messages}/>}
        </div>
        {
          loader
          ?<LoaderWrapper><ThreeDots color='#38bdf8'/></LoaderWrapper>
          :<div className='h-full flex flex-col py-2'>
            <div className='flex-1 flex flex-col overflow-auto box-border'>
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
          <InputBox messages={messages} setMessages={setMessages}/>
          </div>
        }
      </div>
    </div>
  )
}

export default ChatBox;