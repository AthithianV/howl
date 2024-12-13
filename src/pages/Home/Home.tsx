import { useNavigate } from "react-router-dom";
import useUser from "../../store/userStore"
import { useEffect, useState } from "react";
import getMatchingProfile from "../../database/profile/getMatchingProfile";
import LoaderWrapper from "../../components/ui/LoaderWrapper";
import { ThreeDots } from "react-loader-spinner";
import { MatchedUser } from "../../types/match";
import MatchCard from "../../components/Home/MatchCard";

const Home = () => {

  const {user} = useUser();
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
      .finally(()=>setLoader(false));
    }
  },[user]);

  return (
    loader?
    <LoaderWrapper>
      <ThreeDots
        color="#38bdf8"
      />
    </LoaderWrapper>
    :<div className="p-5 flex flex-wrap gap-2">
      {
        matches.map((match, index)=>(
            <MatchCard match={match} index={index}/>
          )
        )
      }
    </div>
  )
}

export default Home