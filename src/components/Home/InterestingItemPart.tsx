import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type PropType = {
    interests:string[],
    title:string;
    icon:IconDefinition
}

const InterestingItemPart = ({interests, title, icon}:PropType) => {
  return (
    <div className="flex flex-wrap gap-1 py-1">
        <span className="font-semibold"><FontAwesomeIcon icon={icon}/> {title}: </span>
        {
            interests.map((interest, index)=>(
                <span key={index} className="text-sm bg-sky-400 font-semibold text-white px-2 py-[0.4px] rounded">{interest}</span>
            ))
        }
    </div>
  )
}

export default InterestingItemPart