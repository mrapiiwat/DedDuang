import React from "react";
import { Link, useLocation } from "react-router-dom";
import { imgUrl } from "../utils/image";

const SideBar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const getLinkClass = (path: string) =>
    `flex items-center justify-start gap-10 p-4 rounded-lg ${
      currentPath === path ? "bg-[#2A2A2A]" : "hover:bg-[#2A2A2A]"
    }`;

  return (
    <div className="flex flex-col bg-[#1E1E1E] w-[300px] h-screen py-10 px-7 gap-20">
      <div className="flex flex-col gap-2">
        <div>
          <Link to="/admin" className={getLinkClass("/admin")}>
            <img className="w-[46px] h-[46px] object-contain" src={imgUrl[0]} />
            <h1 className="text-white text-xl font-prompt">ฟีดข่าว</h1>
          </Link>
        </div>
        <div>
          <Link to="/admin/zodiac" className={getLinkClass("/admin/zodiac")}>
            <img className="w-[46px] h-[46px] object-contain" src={imgUrl[1]} />
            <h1 className="text-white text-xl font-prompt">ฤกษ์ราศี</h1>
          </Link>
        </div>
        <div>
          <Link to="/admin/curse" className={getLinkClass("/admin/curse")}>
            <img className="w-[46px] h-[46px] object-contain" src={imgUrl[2]} />
            <h1 className="text-white text-xl font-prompt">ปีชง</h1>
          </Link>
        </div>
        <div>
          <Link to="/admin/tarot" className={getLinkClass("/admin/tarot")}>
            <img className="w-[46px] h-[46px] object-contain" src={imgUrl[3]} />
            <h1 className="text-white text-xl font-prompt">ไพ่ทาโรต์</h1>
          </Link>
        </div>
        <div>
          <Link to="/admin/seemsee" className={getLinkClass("/admin/seemsee")}>
            <img className="w-[46px] h-[46px] object-contain" src={imgUrl[4]} />
            <h1 className="text-white text-xl font-prompt">เซียมซี</h1>
          </Link>
        </div>
      </div>
      <div>
        <div className={getLinkClass("/logout")}>
          <img className="w-[40px] h-[40px] object-contain" src={imgUrl[5]} />
          <h1 className="text-white text-xl font-prompt">ออกจากระบบ</h1>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
