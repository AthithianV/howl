import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPaperPlane, faPowerOff, faUser, faUserGroup } from "@fortawesome/free-solid-svg-icons";

import Brand, { BrandImg } from "./Brand";
import { useEffect, useState } from "react";
import useChat from "../store/chatStore";

const topLinks = [
    { name: "Home", to: "/", icon: faHome },
    { name: "Chat", to: "/chat", icon: faPaperPlane},
    { name: "Groups", to: "/group", icon: faUserGroup }
];

const bottomLinks = [
    { name: "Profile", to: "/profile", icon: faUser },
    { name: "Sign Out", to: "/signout", icon: faPowerOff }
]

const Sidebar = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [completeSignOut, setCompleteSignOut] = useState(false);
    const {setChat, setChatList} = useChat();

    function activeLink(path:string){
        if(
            (location.pathname.startsWith("/chat") && path === "/chat") ||
            (location.pathname.startsWith("/profile") && path === "/profile") ||
            (location.pathname.startsWith("/group") && path === "/group")
        ){
            return "text-sky-400";
        }
        return location.pathname === path?"text-sky-400":""
    }


    useEffect(()=>{
        if(completeSignOut){
            navigate("/auth/login");
            setCompleteSignOut(false);
        }
    }, [completeSignOut])

    const signout = async ()=>{
        Cookies.remove("user");
        setCompleteSignOut(true);
        setChatList([]);
    }

  return (
    <nav className='h-full bg-slate-200 flex flex-col justify-between p-2 border-e-2 border-slate-50'>
        <div>
            <div className="hidden max-md:block py-2 border-b-2 border-white mb-2">
                <BrandImg/>
            </div>
            <div className="blcok max-md:hidden">
                <Brand/>
            </div>
            <ul>
                {
                    topLinks.map((link, index)=>(
                        <li key={index} onClick={()=>{if(link.name==="Chat")setChat(null)}}>
                            <Link 
                            to={link.to} 
                            className={`sidebar-item ${activeLink(link.to)}`}>
                                <FontAwesomeIcon icon={link.icon}/>
                                <span className="max-md:hidden block">{link.name}</span>
                            </Link>
                        </li>)
                    )
                }
            </ul>
        </div>
        <div className="my-5 py-2 border-t-2 border-white rounded">
            <ul>
                {
                    bottomLinks.map((link, index)=>(
                        <li key={index} onClick={()=>{if(link.name==="Sign Out") signout()}}>
                            <Link to={link.to} className={`sidebar-item ${activeLink(link.to)}`}>
                                <FontAwesomeIcon icon={link.icon}/>
                                <span className="max-md:hidden block">{link.name}</span>
                            </Link>
                        </li>)
                    )
                }
            </ul>
        </div>
        
    </nav>
  )
}

export default Sidebar