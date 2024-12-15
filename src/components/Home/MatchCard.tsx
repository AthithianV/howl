import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { ThreeDots } from "react-loader-spinner"

import { MatchedUser } from "../../types/match"
import ImageContainer from "../ui/ImageContainer"
import InterestPart from "./InterestPart"
import { addToChatList } from "../../database/chatList/addToChatList"
import useUser from "../../store/userStore"
import useChat from "../../store/chatStore"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"

const MatchCard = ({match}:{index:number, match:MatchedUser}) => {

    const [loading, setLoading] = useState(false);
    const [added, setAdded] = useState(false);
    const {user} = useUser();
    const {chatList} = useChat();

    useEffect(()=>{
        console.log(chatList);
        console.log(match.user.uid);
        
        
        if(chatList.some(chat=>chat.user.uid === match.user.uid))
            setAdded(true);
    }, [chatList])

    const addUser = ()=>{
        setLoading(true);
        if(user){
            Promise.resolve(addToChatList(user.uid, match.user.uid))
            .then(()=>setAdded(true))
            .catch(()=>toast.error("Somthing Went Wrong!"))
            .finally(()=>setLoading(false));
        }
    }

  return (
    <div>
        <div className="flex-center flex-col gap-1 border-b-2  py-2 my-2">
            <ImageContainer 
                name={`${match.user.username} - Profile Picture`}
                url={match.profile.pictureUrl as string}
                height={10}
                width={10}
            />
            <Link
                to={`/profile/${match.user.uid}`}
                className="logo-font hover:text-blue-500 hover:underline"
            >
                {match.user.username}
            </Link>
        </div>
        {
            (match.matches.ageMatch || match.matches.occupationMatch || match.matches.genderMatch) &&
            <div className="flex flex-col border-b-2  gap-2 py-2 my-2">
                <h1 className="font-semibold underline">Profile Matches: </h1>
                    <div>
                        <span className="font-semibold">Age:</span> 
                        {
                            match.matches.ageMatch
                            ?<span>{match.profile.age}</span>
                            :<span>N/A</span>
                        }
                    </div>
                    <div>
                        <span className="font-semibold">Occupation:</span> 
                        {match.matches.occupationMatch
                        ?<span>{match.profile.occupation}</span>
                        :<span>N/A</span>}
                    </div>
                    <div>
                        <span className="font-semibold">Gender:</span> 
                        {match.matches.genderMatch
                        ?<span>{match.profile.occupation}</span>
                        :<span>N/A</span>}
                    </div>
            </div>
        }

        <InterestPart interests={match.matches}/>
        
        <div className="flex-center py-5 border-t-2">
            {added
            ?<Link to={`/chat/${match.user.uid}`} className="bg-sky-400 py-1 px-4 rounded-md text-white font-semibold flex-center gap-1">
                Open Chat
            </Link>
            :<button onClick={addUser} className="bg-black py-1 px-4 rounded-md text-white font-semibold">
                {loading
                    ?<ThreeDots
                        color={"white"}
                        height={25}
                        width={25} 
                    />
                    :<span className="flex-center gap-1"><FontAwesomeIcon icon={faPlus}/>Start Chat</span>}
            </button>
            }
        </div>
    </div>
  )
}

export default MatchCard;