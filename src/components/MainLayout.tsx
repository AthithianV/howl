import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

function MainLayout() {

  return (
    <div className="h-screen w-screen flex">
      <Sidebar />
      <div className="flex-1 bg-sky-50">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;