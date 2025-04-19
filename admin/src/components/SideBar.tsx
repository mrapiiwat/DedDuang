import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { imgUrl } from "../utils/image";
import useAuthStore from "../store/authStore";
import Modal from "./Modal";

const SideBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const actionLogout = useAuthStore((state) => state.actionLogout);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const getLinkClass = (path: string) =>
    `flex items-center justify-start gap-10 p-4 rounded-lg ${
      currentPath === path ? "bg-[#2A2A2A]" : "hover:bg-[#2A2A2A]"
    }`;

  const handleConfirmLogout = async () => {
    await actionLogout();
    setShowLogoutModal(false);
    navigate("/");
  };

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
        <div
          onClick={() => setShowLogoutModal(true)}
          className={`${getLinkClass("/logout")} cursor-pointer`}
        >
          <img className="w-[40px] h-[40px] object-contain" src={imgUrl[5]} />
          <h1 className="text-white text-xl font-prompt">ออกจากระบบ</h1>
        </div>
      </div>

      <Modal isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)}>
        <div className="flex flex-col items-center gap-4 px-6 py-4">
          <p className="text-black text-lg font-prompt">
            คุณต้องการออกจากระบบใช่ไหม?
          </p>
          <div className="flex gap-4 mt-2">
            <button
              onClick={handleConfirmLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              ตกลง
            </button>
            <button
              onClick={() => setShowLogoutModal(false)}
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SideBar;
