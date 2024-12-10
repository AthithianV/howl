import { Link, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPaperPlane, faPowerOff, faUser, faUserGroup } from "@fortawesome/free-solid-svg-icons";

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
        name: "SignOut",
        to: "/signout",
        icon: faPowerOff
    }
]

const Sidebar = () => {

    const location = useLocation();

  return (
    <nav className='h-full bg-slate-200 flex flex-col justify-between p-2'>
        <div>
            <div className="flex items-center gap-2 my-5 px-12 border-b-[0.5px] border-white pb-4">
                <div className="rounded-full">
                    <img src={"/howl.svg"} alt={"logo"} className="h-10 w-10 overflow-hidden rounded-full"/>
                </div>
                <h1 className="text-center logo-font text-2xl font-semibold">
                    HOWL
                </h1>
            </div>
            
            <ul>
                {
                    topLinks.map((link)=>(
                        <li>
                            <Link to={link.to} className={`sidebar-item ${location.pathname === link.to?"text-sky-400":""}`}>
                                <FontAwesomeIcon icon={link.icon}/>
                                {link.name}
                            </Link>
                        </li>)
                    )
                }
            </ul>
        </div>
        <div className="my-5 py-2 border-t-2 border-white rounded">
            <ul>
                {
                    bottomLinks.map((link)=>(
                        <li>
                            <Link to={link.to} className={`sidebar-item ${location.pathname === link.to?"text-sky-400":""}`}>
                                <FontAwesomeIcon icon={link.icon}/>
                                {link.name}
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