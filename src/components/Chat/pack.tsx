import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usepack from "../../store/packStore";
import ImageContainer from "../ui/ImageContainer";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const PackBox = () => {
    
    const {pack, selectedPack, setSelectedPack} = usepack();

  return (
    <div className="w-fit h-screen flex flex-col p-4 border-s-[1px] border-e-[1px] border-gray-400 ">
        <div className="mb-4 p-2 border-b-2 border-sky-400 bg-white rounded flex gap-2 items-center">
            <FontAwesomeIcon icon={faSearch}/>
            <input type="text" className="bg-transparent focus:outline-none"/>
        </div>
        <div className="flex flex-col items-center overflow-auto">
        {
            pack.map((p, index)=>(
                <Link
                to={`/chat/`}
                key={index} 
                className={`pack-item ${selectedPack === p.user.uid?"bg-sky-400":"hover:bg-slate-300"}`}
                onClick={()=>setSelectedPack(p.user.uid)}
                >
                    <ImageContainer 
                        url={p.profile.pictureUrl as string}
                        name={p.profile.fullName} 
                        height={10}
                        width={10}/>
                    <span className="font-semibold text-xl">{p.profile.fullName}</span>
                </Link>
            ))
        }
        </div>
    </div>
  )
}

export default PackBox;