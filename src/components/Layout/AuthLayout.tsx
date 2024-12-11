import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { isLogggedIn } from "../../database/users/auth";

function AuthLayout() {

  return (
    <div className="h-screen w-screen flex-center bg-gradient-to-b from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90%">
        <Outlet />
    </div>
  );
}

export default AuthLayout;