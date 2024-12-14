import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useChat from "../../store/chatStore";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const ChatListBox = () => {
    
    const {chatList, selectedChat, setChat} = useChat();
    const navigate = useNavigate();

    const { userId } = useParams();

    useEffect(()=>{
        if(userId){
            setChat(userId);
        }
    }, [userId])


    useEffect(()=>{
        if(selectedChat){
            navigate(`/chat/${selectedChat}`)
        }
    }, [selectedChat])

  return (
    <div className="w-fit h-screen flex flex-col p-4 border-s-[1px] border-e-[1px] border-gray-400 ">
        <div className="mb-4 p-2 border-b-2 border-sky-400 bg-white rounded flex gap-2 items-center">
            <FontAwesomeIcon icon={faSearch}/>
            <input type="text" className="bg-transparent focus:outline-none"/>
        </div>
        <div className="flex flex-col items-center overflow-auto">
        {
            chatList.map((p, index)=>(
                <div
                key={index} 
                className={`chatlist-item ${selectedChat === p.user.uid?"bg-sky-400":"hover:bg-slate-300"}`}
                onClick={()=>setChat(p.user.uid)}
                >
                    {/* <ImageContainer 
                        url={p.profile.pictureUrl as string}
                        name={p.profile.fullName} 
                        height={10}
                        width={10}/> */}
                    <div className="p-2 rounded-full bg-white">
                        {p.profile.pictureUrl && <img src={p.profile.pictureUrl} alt={p.profile.fullName} className="h-8 w-8 overflow-hidden"/>}
                    </div>
                    <span className="font-semibold text-md">{p.profile.fullName}</span>
                </div>
            ))
        }
        </div>
    </div>
  )
}

export default ChatListBox;