import { faBook, faBurger, faDumbbell, faUserSecret, faVideo } from "@fortawesome/free-solid-svg-icons"
import { MatchType } from "../../types/match"
import InterestingItemPart from "./InterestingItemPart"


const InterestPart = ({interests}:{interests: MatchType}) => {
  return (
    <div className="flex flex-col gap-2 py-2 my-2">
        <h1 className="font-semibold underline">Interest Matches: </h1>
        {<InterestingItemPart title={"Hobbies"} interests={interests.hobbiesMatches} icon={faDumbbell}/>}
        {<InterestingItemPart title={"Animes"} interests={interests.animesMatches} icon={faUserSecret}/>}
        {<InterestingItemPart title={"Foods"} interests={interests.foodsMatches} icon={faBurger}/>}
        {<InterestingItemPart title={"Books"} interests={interests.booksMatches} icon={faBook}/>}
        {<InterestingItemPart title={"Movies"} interests={interests.moviesMatches} icon={faVideo}/>}
    </div>
  )
}

export default InterestPart