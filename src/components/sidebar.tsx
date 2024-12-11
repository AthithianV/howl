import { Link, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPaperPlane, faPowerOff, faUser, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import Brand from "./Brand";

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
            <Brand/>
            <ul>
                {
                    topLinks.map((link, index)=>(
                        <li key={index}>
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
                    bottomLinks.map((link, index)=>(
                        <li key={index}>
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