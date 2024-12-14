import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useChat from "../../store/chatStore"
import { useParams } from "react-router-dom";
import useUser from "../../store/userStore";
import { useEffect, useState } from "react";
import LoaderWrapper from "../ui/LoaderWrapper";
import { ThreeDots } from "react-loader-spinner";
import { theme } from "../../util/theme";
import { getPrompts } from "../../util/chats/getPrompts";
import { toast } from "react-toastify";

const PromptBox = () => {

  const {setPromptDisplay, displayPrompt, setPromptText } = useChat();
  const [prompts, setPrompts] = useState<string[]>([]);
  const {userId} = useParams();
  const {user} = useUser();
  const [loader, setLoader] = useState(false);

  useEffect(()=>{
    if(userId && user && prompts.length===0){
      setLoader(true);
      Promise.resolve(getPrompts(user.uid, userId))
      .then((res)=>setPrompts(res.split('/')))
      .catch((err)=>{
        console.log(err);
        toast.error("Something went Wrong")
      })
      .finally(()=>setLoader(false));
    }
  }, [userId, user])

  return (
    <div className="bg-white shadow-lg border-2 rounded-lg py-4 px-8 absolute w-full box-border">
      {
        loader
        ?<LoaderWrapper><ThreeDots color={theme.color.sky}/></LoaderWrapper>
        :<div>
            <div className="flex justify-between">
              <h1 className="font-semibold my-2 text-md">Prompt to Start your conversation easily and Meaningfully:</h1>
              <button onClick={()=>setPromptDisplay(!displayPrompt)} className="text-xl text-red-500"><FontAwesomeIcon icon={faXmark}/></button>
            </div>
            <div>
              {
                prompts && prompts.map((prompt, index)=>(
                  <div
                    onClick={()=>setPromptText(prompt)} 
                    className="my-2 p-2 cursor-pointer border-2 border-violet-500 rounded hover:bg-violet-200"
                    key={index}
                  >
                    {prompt}
                  </div>
                ))
              }
            </div>
          </div>
      }
    </div>
  )
}

export default PromptBox;