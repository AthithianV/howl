import { useNavigate } from "react-router-dom";
import ProfileForm from "../../components/profile/ProfileForm";
import useUser from "../../store/userStore";
import { useEffect } from "react";

const CreateProfile = () => {

  const {user} = useUser();
  const navigate = useNavigate();

  useEffect(()=>{
    console.log(user);
    
    if(user && user.hasProfile){

      navigate("/");  
    }
  }, [user]);

  return (
    <div className="w-full flex-center box-border">
      <div className="w-7/12 max-md:w-full px-24 max-lg:px-12 py-10 box-border rounded-md shadow-md border-2 bg-white">
          <ProfileForm/>
      </div>
    </div>
  )
}

export default CreateProfile;