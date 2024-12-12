import { useNavigate } from "react-router-dom";
import useUser from "../../store/userStore"
import { useEffect } from "react";

const Home = () => {

  const {user} = useUser();
  const navigate = useNavigate();

  useEffect(()=>{
    if(user && !user.matchedProfileCount){
      navigate("/howl");
    }
  },[]);

  return (
    <div>Home</div>
  )
}

export default Home