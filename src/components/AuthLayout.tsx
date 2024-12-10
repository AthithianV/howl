import { Outlet } from "react-router-dom";

function AuthLayout() {

  return (
    <div className="h-screen w-screen flex-center">
        <Outlet />
    </div>
  );
}

export default AuthLayout;