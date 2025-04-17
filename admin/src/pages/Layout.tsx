import React from "react";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import topLogo from "../assets/top-logo.png";

const Layout: React.FC = () => {
  return (
    <div>
      <div>
        <div className="bg-[#1A0040] w-full h-[39px] flex justify-center items-center fixed top-0 z-10">
          <img src={topLogo} alt="Logo" className="h-2/4 object-contain" />
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
