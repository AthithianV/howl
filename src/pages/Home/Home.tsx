import { useNavigate } from "react-router-dom";
import useUser from "../../store/userStore"
import { useEffect, useState } from "react";
import getMatchingProfile from "../../database/profile/getMatchingProfile";
import LoaderWrapper from "../../components/ui/LoaderWrapper";
import { ThreeDots } from "react-loader-spinner";
import { MatchedUser } from "../../types/match";
import MatchCard from "../../components/Home/MatchCard";
import { getPack } from "../../database/pack/getPack";
import usepack from "../../store/packStore";

const Home = () => {

  const {user} = useUser();
  const {pack, setPack} = usepack();
  const [loader, setLoader] = useState(false);
  const [matches, setMatches] = useState<MatchedUser[]>([]);
  const navigate = useNavigate();

  useEffect(()=>{
    if(user && !user.matchedProfileCount){
      navigate("/howl");
      return;
    }
    if(user){
      setLoader(true);
      Promise.resolve(getMatchingProfile(user.uid))
      .then((result)=>setMatches(result))
      .catch()
      if(pack.length===0){
        Promise.resolve(getPack(user.uid))
        .then((result)=>setPack(result))
        .catch()
        .finally(()=>setLoader(false));
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
      <div className="flex flex-wrap gap-2">
      {
        matches.map((match, index)=>(
          <div  key={index} className="p-10 shadow-md rounded-md border min-w-80 bg-slate-100">
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