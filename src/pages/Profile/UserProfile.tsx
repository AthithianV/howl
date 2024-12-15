import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import LoaderWrapper from '../../components/ui/LoaderWrapper';
import { ThreeDots } from 'react-loader-spinner';
import { getUserData } from '../../database/users/GetUserData';
import { doc } from 'firebase/firestore';
import db from '../../database/firebase';
import { toast } from 'react-toastify';
import { UserDataType } from '../../types/user';
import DisplayProfile from '../../components/profile/DisplayProfile';
import useUser from '../../store/userStore';


const UserProfile = () => {

    const {uid} =useParams();
    const {user} = useUser();
    const navigate = useNavigate();
    const [userData, setUserData] = useState<UserDataType|null>(); 
    const [loader, setLoader] = useState(false); 

    useEffect(()=>{
    if(user && !user.hasProfile){
      navigate("/profile/create-profile");
    }
  }, [user])

    useEffect(()=>{
        if(uid){
            setLoader(true);
            Promise.resolve(getUserData(doc(db, 'users', uid)))
            .then(res=>setUserData(res))
            .catch(()=>toast.error("Something Went Wrong!"))
            .finally(()=>setLoader(false));
        }
    }, [])

  return (
    loader
        ?<LoaderWrapper><ThreeDots color='#38bdf8'/></LoaderWrapper>
        :userData
            ?<DisplayProfile userData={userData}/>
            :<div>User Not Found</div>
  )
}

export default UserProfile