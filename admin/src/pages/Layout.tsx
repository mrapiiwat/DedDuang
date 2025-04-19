import React from "react";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import topLogo from "../assets/top-logo.png";
import useAuthStore from "../store/authStore";

const Layout: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <div>
      <div>
        <div className="bg-[#1A0040] w-full h-[39px] flex justify-center items-center fixed top-0 z-10">
          <img src={topLogo} alt="Logo" className="h-2/4 object-contain" />
          <p className="text-[#D2B589] absolute right-11 font-prompt font-bold text-sm">
            ADMIN : {user?.name.split(" ")[0].toUpperCase()}
          </p>
        </div>
        <div className="fixed top-[39px] left-0 z-20">
          <SideBar />
        </div>
      </div>
      <div className="ml-[300px] mt-[39px] p-4 h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
