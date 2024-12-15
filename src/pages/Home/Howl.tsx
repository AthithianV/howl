import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useUser from "../../store/userStore";
import { matchProfile } from "../../database/profile/ProfileMatching";
import HowlButton from "../../components/Home/HowlButton";
import { toast } from "react-toastify";

const Howl = () => {

    const [loading, setLoading] = useState(false);
    const {user, setUser} = useUser();
    const navigate = useNavigate();
    const [finishedMatching, setFinishedMatching] = useState(false);

    useEffect(()=>{
        if(finishedMatching){
            navigate("/");
            setFinishedMatching(false);
        }
    }, [finishedMatching]);

    
  useEffect(()=>{
    if(user && !user.hasProfile){
      navigate("/profile/create-profile");
    }
  }, [user])

    async function howl(){
        setLoading(true);
        try {
            if(user){
                const result = await matchProfile(user.uid);
                if(!result.matchCount){
                    toast.error("No Match Found");
                }
                setUser(user)
                setFinishedMatching(true);
            }
        }catch (error) {
            toast.error("Somthing Went Wrong!")
        }finally{
            setLoading(false);
        }
    }

  return (
    <div className="howling flex-center text-white font-semibold">
        <div onClick={howl}>
            <HowlButton loading={loading}/>
        </div>
    </div>
  )
}

export default Howl;