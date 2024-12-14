import { Link, useNavigate } from "react-router-dom";
import useUser from "../../store/userStore"
import { useEffect, useState } from "react";
import getMatchingProfile from "../../database/profile/getMatchingProfile";
import LoaderWrapper from "../../components/ui/LoaderWrapper";
import { ThreeDots } from "react-loader-spinner";
import { MatchedUser } from "../../types/match";
import MatchCard from "../../components/Home/MatchCard";
import { getChatList } from "../../database/chatList/getChatList";
import useChat from "../../store/chatStore";
import { toast } from "react-toastify";

const Home = () => {

  const {user} = useUser();
  const {chatList, setChatList} = useChat();
  const [loader, setLoader] = useState(false);
  const [matches, setMatches] = useState<MatchedUser[]>([]);
  const navigate = useNavigate();

  useEffect(()=>{
    if(user && !user.hasProfile){
      navigate("/profile/create-profile");
    }
  }, [user])

  useEffect(()=>{
    if(user && !user.matchedProfileCount){
      navigate("/howl");
      return;
    }
    if(user){
      if(matches.length===0){
        setLoader(true);
        Promise.resolve(getMatchingProfile(user.uid))
        .then((result)=>setMatches(result))
        .catch(()=>toast.error("Somthing Went Wrong!"))
        .finally(()=>setLoader(false));
        if(chatList.length===0){
          Promise.resolve(getChatList(user.uid))
          .then((result)=>setChatList(result))
          .catch(()=>toast.error("Somthing Went Wrong!"))
        }
      }
    }
  },[user]);

  return (
    loader?
    <LoaderWrapper>
      <ThreeDots
        color="#38bdf8"
      />
    </LoaderWrapper>
    :<div className="p-5">
      <h1 className="text-center my-5 font-semibold text-4xl logo-font">Matched Users</h1>
      <div className="flex justify-end">
        <Link to="/howl" className="font-semibold text-md text-blue-600 underline">Find More Matches</Link>
      </div>
      <div className="flex flex-wrap gap-2">
      {
        matches.map((match, index)=>(
          <div  key={index} className="py-2 px-10 shadow-md rounded-md border min-w-80 bg-slate-100">
            <MatchCard match={match} index={index}/>
          </div>
          )
        )
      }
      </div>
    </div>
  )
}

export default Home