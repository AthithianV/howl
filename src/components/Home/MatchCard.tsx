import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { MatchedUser } from "../../types/match"
import ImageContainer from "../ui/ImageContainer"
import InterestPart from "./InterestPart"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

const MatchCard = ({match, index}:{index:number, match:MatchedUser}) => {
  return (
    <div className="p-4 shadow-md rounded-md border min-w-80 bg-slate-100" key={index}>
        <div className="flex-center flex-col gap-1 border-b-2  py-2">
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
            <div className="flex flex-col border-b-2  gap-2 py-2">
                {match.matches.ageMatch && <div><span className="font-semibold">Age:</span> {match.profile.age}</div>}
                {match.matches.occupationMatch && <div><span className="font-semibold">Occupation:</span> {match.profile.occupation}</div>}
                {match.matches.genderMatch && <div><span className="font-semibold">Gender:</span> {match.profile.gender}</div>}
            </div>
        }

        <InterestPart interests={match.matches}/>
        
        <div className="flex-center py-2 border-t-2 border-t-2 ">
            <button className="bg-black py-1 px-2 rounded-md  text-white font-semibold"><FontAwesomeIcon icon={faPlus}/> ADD</button>
        </div>
    </div>
  )
}

export default MatchCard