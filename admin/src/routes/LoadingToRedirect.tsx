import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const LoadingToRedirect: React.FC = () => {
  const [count, setCount] = useState(3);
  const [redirect, setRedirect] = useState(false);
  const actionLogout = useAuthStore((state) => state.actionLogout);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => {
        if (currentCount === 1) {
          clearInterval(interval);
          setRedirect(true);
        }
        return currentCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (redirect) {
    actionLogout();
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A0040] text-white px-4">
      <div className="text-center space-y-4 animate-fade-in-up">
        <h1 className="text-4xl font-bold text-[#D2B589] font-prompt">
          ไม่มีสิทธิ์เข้าถึงหน้านี้
        </h1>
        <p className="text-lg font-prompt">
          กำลังนำคุณกลับไปยังหน้าแรกใน{" "}
          <span className="text-[#D2B589] text-2xl font-bold">{count}</span>{" "}
          วินาที...
        </p>
        <div className="w-20 h-20 border-4 border-t-[#D2B589] border-white rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
};

export default LoadingToRedirect;
