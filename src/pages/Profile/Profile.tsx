import { Outlet, useLocation, useNavigate } from "react-router-dom"
import useUser from "../../store/userStore";
import { useEffect } from "react";

const Profile = () => {

  const {user} = useUser();
  const location =useLocation();
  const navigate =useNavigate();

  useEffect(()=>{
    if(user && location.pathname==="/profile"){
      navigate(`${user.uid}`)
    }
  })

  useEffect(()=>{
    if(user && !user.hasProfile){
      navigate("/profile/create-profile");
    }
  }, [user])

  return (
    <div className='w-full h-screen overflow-auto box-border'>
      <Outlet/>
    </div>
  )
}

export default Profile