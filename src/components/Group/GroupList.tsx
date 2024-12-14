import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { GroupType } from "../../types/group";
import { Link } from "react-router-dom";
import { getGroups } from "../../database/group.tsx/getGroups";
import { toast } from "react-toastify";
import LoaderWrapper from "../ui/LoaderWrapper";
import { ThreeDots } from "react-loader-spinner";
import { theme } from "../../util/theme";
import GroupCard from "./GroupCard";
import useUser from "../../store/userStore";
import { getUserGroupList } from "../../database/group.tsx/getUserGroupList";

const GroupList = () => {

    const [groupList, setGroupList] = useState<GroupType[]>([]);
    const [loader, setLoader] = useState(false);

    const [userGroupList, setUserGroupList] = useState<string[]>([]);
    const {user} = useUser();

    useEffect(()=>{
        setLoader(true);
        Promise.resolve(getGroups())
        .then((res)=>{setGroupList(res)})
        .catch(()=>toast.error("Something Went wrong"))
        .finally(()=>setLoader(false))
        if(user){
            Promise.resolve(getUserGroupList(user.uid))
            .then((res)=>setUserGroupList(res))
            .catch(()=>toast.error("Something Went wrong!"))
        }
        console.log(groupList);
        console.log(userGroupList);
        
    }, [user])


  return (
    <div className="p-4 h-screen box-border">
    {    
        loader
        ?<LoaderWrapper><ThreeDots color={theme.color.sky}/></LoaderWrapper>
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
                    groupList.map((group, index)=>(
                        <div key={index}>
                        <GroupCard group={group} joined={userGroupList.includes(group.id)}/>
                        </div>
                    ))
                } 
                </div>  
            </div>
        </div>
    }
    </div>
  )
}

export default GroupList