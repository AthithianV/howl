import { useState } from "react";

import useUser from "../../store/userStore";
import { matchProfile } from "../../database/profile/ProfileMatching";
import HowlButton from "../../components/Home/HowlButton";

const Howl = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const {user} = useUser();

    async function howl(){
        setLoading(true);
        try {
            if(user){
                await matchProfile(user.uid);
            }
        }catch (error) {
            setError("Something Went Wrong")
        }finally{
        setLoading(false);
        }
    }

  return (
    <div className="howling flex-center text-white font-semibold">
        {error?
            <div className="py-5 px-10 rounded-md border-4 border-red-500 bg-black">
                {error}
            </div>
            :<div onClick={howl}>
                <HowlButton loading={loading}/>
            </div>
        }
    </div>
  )
}

export default Howl;