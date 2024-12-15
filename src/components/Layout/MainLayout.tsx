import cookies from "js-cookie";
import { Outlet, useNavigate } from "react-router-dom";

import Sidebar from "../sidebar";
import { useEffect, useState } from "react";
import useUser from "../../store/userStore";
import { getUserData } from "../../database/users/GetUserData";
import { doc } from "firebase/firestore";
import db from "../../database/firebase";
import { toast } from "react-toastify";
import LoaderWrapper from "../ui/LoaderWrapper";
import { ThreeDots } from "react-loader-spinner";
import { theme } from "../../util/theme";

function MainLayout() {

  const navigate = useNavigate();
  const {setUser} = useUser();

  const [loader, setLoader] = useState(false);
  const user = cookies.get("user");

  useEffect(()=>{    
    if(user){
      const userInfo = JSON.parse(user);
      setUser(userInfo);
      setLoader(true);
      Promise.resolve(getUserData(doc(db, 'users', userInfo.uid)))
      .then((res)=>{
        setUser(res.user);
      })
      .catch(()=>toast.error("Something Went Wrong!"))
      .finally(()=>setLoader(false))
    }else{
      navigate("/auth/login");
    }
  }, [])

  return (
    loader
    ?<LoaderWrapper><ThreeDots color={theme.color.sky}/></LoaderWrapper>
    :<div className="w-screen flex-center overflow-auto">
      <Sidebar />
      <div className="flex-1 bg-slate-50 h-screen overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;