import { useEffect, useState } from "react";

import PackBox from "../../components/Chat/pack";
import usepack from "../../store/packStore";
import { getPack } from "../../database/pack/getPack";
import useUser from "../../store/userStore";
import LoaderWrapper from "../../components/ui/LoaderWrapper";
import { ThreeDots } from "react-loader-spinner";
import { Outlet } from "react-router-dom";

const Chat = () => {

  const {pack, setPack, selectedPack} = usepack();
  const {user} = useUser();
  const [loader, setLoader] = useState(false);
    
  useEffect(()=>{
      if(user && pack.length===0){
          setLoader(true);
          Promise.resolve(getPack(user.uid))
          .then((result)=>setPack(result))
          .catch()
          .finally(()=>setLoader(false));
      }
  }, [user])

  return (
    loader
      ?<LoaderWrapper><ThreeDots color="#38bdf8"/></LoaderWrapper>
      :<div className="flex">
        <PackBox/>
        <div className="flex-1 overflow-auto h-screen">
          {
            !selectedPack
            ?<div className="flex-center">
              <img src="/chat-box-poster.svg" alt="Wolf Howling" className="h-[600px]"/>
            </div>
            :<Outlet/>
          }
        </div>
      </div>
  )
}

export default Chat;