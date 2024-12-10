import { Link } from "react-router-dom";

import homeIcon from "../assets/icons/home.svg";
import chatIcon from "../assets/icons/chat.svg";
import groupIcon from "../assets/icons/group.svg";
import profileIcon from "../assets/icons/profile.svg";

const links = [
    {
        name: "Home",
        to: "/home",
        icon: homeIcon
    },
    {
        name: "Chat",
        to: "/chat",
        icon: chatIcon
    },
    {
        name: "Packs",
        to: "/packs",
        icon: groupIcon
    }
];

const Sidebar = () => {
  return (
    <nav className='h-full bg-slate-200 flex flex-col justify-between p-2'>
        <div>
            <div className="flex items-center gap-2 my-5 px-16">
                <div className="rounded-full">
                    <img src={"/howl.svg"} alt={"logo"} className="h-10 w-10 overflow-hidden rounded-full"/>
                </div>
                <h1 className="text-center logo-font text-2xl font-semibold">
                    HOWL
                </h1>
            </div>
            
            <ul>
                {
                    links.map((link)=>(
                        <li>
                            <Link to={link.to} className="flex items-center text-xl font-semibold my-2 gap-2 py-2 px-16 hover:bg-slate-400 rounded">
                                <img src={link.icon} alt={link.name} className="h-8 w-8"/>
                                {link.name}
                            </Link>
                        </li>)
                    )
                }
            </ul>
        </div>
        <div className="my-5 py-2 border-t-2 border-white rounded">
            <Link to="/profile" className="flex gap-2 py-4 px-16 text-xl font-semibold items-center hover:bg-slate-400 rounded">
                <img src={profileIcon} alt={"profile"} className="h-6 w-6"/>
                Profile
            </Link>
        </div>
        
    </nav>
  )
}

export default Sidebar