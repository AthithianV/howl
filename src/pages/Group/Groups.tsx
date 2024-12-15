import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { toast } from "react-toastify";

import GroupList from "../../components/Group/GroupList"
import useUser from "../../store/userStore";


const Groups = () => {

  const location = useLocation();
  const {user} = useUser();
  const navigate = useNavigate();

  
    useEffect(()=>{
      if(user && !user.hasProfile){
        toast.error("Create Profile to continue");
        navigate("/profile/create-profile");
      }
    }, [])

  return (
    <div>
      {
        location.pathname==="/group"
        ?<GroupList />
        :<Outlet/>
      }

    </div>
  )
}

export default Groups