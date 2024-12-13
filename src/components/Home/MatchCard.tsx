import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { ThreeDots } from "react-loader-spinner"

import { MatchedUser } from "../../types/match"
import ImageContainer from "../ui/ImageContainer"
import InterestPart from "./InterestPart"
import { addToPack } from "../../database/pack/addToPack"
import useUser from "../../store/userStore"
import usepack from "../../store/packStore"

const MatchCard = ({match, index}:{index:number, match:MatchedUser}) => {

    const [loading, setLoading] = useState(false);
    const [added, setAdded] = useState(false);
    const {user} = useUser();
    const {pack} = usepack();

    useEffect(()=>{
        setAdded(true);
    }, [pack])

    const addUser = ()=>{
        setLoading(true);
        if(user){
            Promise.resolve(addToPack(user.uid, match.user.uid))
            .then(()=>setAdded(true))
            .catch((err)=>console.log(err))
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
            <div className="logo-font">{match.user.username}</div>
        </div>
        {
            (match.matches.ageMatch || match.matches.occupationMatch || match.matches.genderMatch) &&
            <div className="flex flex-col border-b-2  gap-2 py-2 my-2">
                {match.matches.ageMatch && <div><span className="font-semibold">Age:</span> {match.profile.age}</div>}
                {match.matches.occupationMatch && <div><span className="font-semibold">Occupation:</span> {match.profile.occupation}</div>}
                {match.matches.genderMatch && <div><span className="font-semibold">Gender:</span> {match.profile.gender}</div>}
            </div>
        }

        <InterestPart interests={match.matches}/>
        
        <div className="flex-center py-5 border-t-2">
            {added
            ?<button className="bg-zinc-400 py-1 px-4 rounded-md text-white font-semibold flex-center gap-1" disabled>
                <FontAwesomeIcon icon={faCheck}/>Added
            </button>
            :<button onClick={addUser} className="bg-black py-1 px-4 rounded-md text-white font-semibold">
                {loading
                    ?<ThreeDots
                        color={"white"}
                        height={25}
                        width={25} 
                    />
                    :<span className="flex-center gap-1"><FontAwesomeIcon icon={faPlus}/>ADD</span>}
            </button>
            }
        </div>
    </div>
  )
}

export default MatchCard;