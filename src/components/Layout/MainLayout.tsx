import cookies from "js-cookie";
import { Outlet, useNavigate } from "react-router-dom";

import Sidebar from "../sidebar";
import { useEffect } from "react";
import useUser from "../../store/userStore";

function MainLayout() {

  const navigate = useNavigate();
  const {setUser} = useUser();

  const user = cookies.get("user");

  useEffect(()=>{
    if(user){
      setUser(JSON.parse(user));
    }else{
      navigate("/auth/login");
    }
  }, [])

  return (
    <div className="h-screen w-screen flex">
      <Sidebar />
      <div className="flex-1 bg-sky-50">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;