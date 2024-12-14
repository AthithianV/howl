import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import useUser from "../../store/userStore";
import { matchProfile } from "../../database/profile/profileMatching";
import HowlButton from "../../components/Home/HowlButton";
import { toast } from "react-toastify";

const Howl = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const {user} = useUser();
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
                    setError("No Match Found");
                }else{
                    setError("");
                    Cookies.set('user', JSON.stringify(result.user))
                    setFinishedMatching(true);
                }
            }
        }catch (error) {
            toast.error("Somthing Went Wrong!")
        }finally{
            setLoading(false);
        }
    }

  return (
    <div className="howling flex-center text-white font-semibold">
        {error && !loading?
            <div className="py-5 px-10 rounded-md border-4 border-red-500 bg-black flex-center gap-2 flex-col">
                <span>{error}</span>
                <span 
                    onClick={howl}
                    className="logo-font text-sky-400 cursor-pointer hover:underline"
                    >Howl Again</span>
            </div>
            :<div onClick={howl}>
                <HowlButton loading={loading}/>
            </div>
        }
    </div>
  )
}

export default Howl;