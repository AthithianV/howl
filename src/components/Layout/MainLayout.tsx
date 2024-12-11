import Cookies from "js-cookie";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../sidebar";
import { useEffect } from "react";
import { isLogggedIn } from "../../database/users/auth";

function MainLayout() {

  const navigate = useNavigate();

  useEffect(()=>{
    isLogggedIn();
  })

  useEffect(()=>{
    const token = Cookies.get("token");
    console.log(token);
    if(!token){
      navigate("/auth/login");
    }
  });

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