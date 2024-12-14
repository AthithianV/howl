import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { GroupType } from "../../types/group";
import { Link, Outlet, useLocation } from "react-router-dom";
import { getGroups } from "../../database/group.tsx/getGroups";
import { toast } from "react-toastify";
import LoaderWrapper from "../ui/LoaderWrapper";
import { ThreeDots } from "react-loader-spinner";
import { theme } from "../../util/theme";

const GroupList = () => {

    const [groupList, setGroupList] = useState<GroupType[]>([]);
    const location = useLocation();
    const [loader, setLoader] = useState(false);

    useEffect(()=>{
        setLoader(true);
        Promise.resolve(getGroups())
        .then((res)=>{setGroupList(res)})
        .catch(()=>toast.error("Something Went wrong"))
        .finally(()=>setLoader(false))
    }, [])


  return (
    <div className="p-4 h-screen box-border">
        {location.pathname==="/group"
        ?loader?<LoaderWrapper><ThreeDots color={theme.color.sky}/></LoaderWrapper>
            :<div>
                <div className="flex-center gap-1">
                    <input type="text" className="py-2 px-4 bg-slate-200 rounded border-[0.2px] border-black shadow"/>
                    <button className="flex-center gap-1 text-white bg-black p-2 rounded">
                        <FontAwesomeIcon icon={faSearch}/>
                        <span>Search</span>
                    </button>
                </div>
                <div className="flex-1 py-2 overflow-auto">
                    <div className="flex justify-end my-2 border-b-2">
                        <Link  to={"/group/create-group"} className="p-2 flex-center gap-2 bg-black rounded text-white my-2">
                            <FontAwesomeIcon icon={faPlus}/>
                            <span>Create Group</span>
                        </Link>
                    </div>
                    <div className="flex flex-wrap gap-2">
                    {
                        groupList.map((group)=>(
                            <div className={`p-2 px-4 w-fit flex flex-col gap-0 hover:bg-slate-200 rounded cursor-pointer`}>
                                <span className="font-semibold text-lg">{group.name}</span>
                                <span className="font-semibold text-xs bg-red-500 text-white rounded px-1 py-[0.2px] w-fit">{group.theme}</span>
                            </div>
                        ))
                    } 
                    </div>  
                </div>
            </div>
        :<Outlet/>    
    }
    </div>
  )
}

export default GroupList