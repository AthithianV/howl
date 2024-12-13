import { faBook, faBurger, faDumbbell, faUserSecret, faVideo } from "@fortawesome/free-solid-svg-icons"
import { MatchType } from "../../types/match"
import InterestingItemPart from "./InterestingItemPart"


const InterestPart = ({interests}:{interests: MatchType}) => {
  return (
    <div className="flex flex-col gap-2 py-2">
        {interests.hobbiesMatches.length>0 && <InterestingItemPart title={"Hobbies"} interests={interests.hobbiesMatches} icon={faDumbbell}/>}
        {interests.animesMatches.length>0 && <InterestingItemPart title={"Animes"} interests={interests.animesMatches} icon={faUserSecret}/>}
        {interests.foodsMatches.length>0 && <InterestingItemPart title={"Foods"} interests={interests.foodsMatches} icon={faBurger}/>}
        {interests.booksMatches.length>0 && <InterestingItemPart title={"Books"} interests={interests.booksMatches} icon={faBook}/>}
        {interests.moviesMatches.length>0 && <InterestingItemPart title={"Movies"} interests={interests.moviesMatches} icon={faVideo}/>}
    </div>
  )
}

export default InterestPart