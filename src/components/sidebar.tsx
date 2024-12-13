import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPaperPlane, faPowerOff, faUser, faUserGroup } from "@fortawesome/free-solid-svg-icons";

import Brand, { BrandImg } from "./Brand";
import { useEffect, useState } from "react";

const topLinks = [
    {
        name: "Home",
        to: "/",
        icon: faHome
    },
    {
        name: "Chat",
        to: "/chat",
        icon: faPaperPlane
    },
    {
        name: "Groups",
        to: "/groups",
        icon: faUserGroup
    }
];

const bottomLinks = [
    {
        name: "Profile",
        to: "/profile",
        icon: faUser
    },
    {
        name: "Sign Out",
        to: "/signout",
        icon: faPowerOff
    }
]

const Sidebar = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [completeSignOut, setCompleteSignOut] = useState(false);

    useEffect(()=>{
        if(completeSignOut){
            navigate("/auth/login");
            setCompleteSignOut(false);
        }
    }, [completeSignOut])

    const signout = async ()=>{
        Cookies.remove("user");
        setCompleteSignOut(true);
    }

  return (
    <nav className='h-full bg-slate-200 flex flex-col justify-between p-2'>
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
                        <li key={index}>
                            <Link to={link.to} className={`sidebar-item ${location.pathname === link.to?"text-sky-400":""}`}>
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
                            <Link to={link.to} className={`sidebar-item ${location.pathname === link.to?"text-sky-400":""}`}>
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