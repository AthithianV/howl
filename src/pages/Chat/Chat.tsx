import { useEffect, useState } from "react";

import ChatListBox from "../../components/Chat/ChatList";
import useChat from "../../store/chatStore";
import { getChatList } from "../../database/chatList/getChatList";
import useUser from "../../store/userStore";
import LoaderWrapper from "../../components/ui/LoaderWrapper";
import { ThreeDots } from "react-loader-spinner";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Chat = () => {

  const {chatList, setChatList, selectedChat, setChat} = useChat();
  const {user} = useUser();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    if(user && !user.hasProfile){
      toast.error("Create Profile to continue");
      navigate("/profile/create-profile");
    }
  }, [])
    
  useEffect(()=>{
      if(user && chatList.length===0){
          setLoader(true);
          Promise.resolve(getChatList(user.uid))
          .then((result)=>setChatList(result))
          .catch(()=>toast.error("Somthing Went Wrong!"))
          .finally(()=>setLoader(false));
      }
  }, [user])

  useEffect(()=>{
    setChat(null);
  }, [])

  return (
    loader
      ?<LoaderWrapper><ThreeDots color="#38bdf8"/></LoaderWrapper>
      :<div className="flex">
        <ChatListBox/>
        <div className="flex-1 overflow-auto h-screen">
          {
            !selectedChat
            ?<div className="flex-center h-screen">
              {
                <img src="/chat-box-poster.svg" alt="Wolf Howling" className="h-[600px]"/>
              }
            </div>
            :<Outlet/>
          }
        </div>
      </div>
  )
}

export default Chat;