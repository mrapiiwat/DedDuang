import React, { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import { toast } from "react-toastify";
import topLogo from "../../assets/top-logo.png";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const actionLogin = useAuthStore((state) => state.actionLogin);
  const actionLogout = useAuthStore((state) => state.actionLogout);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      if (user.role === "ADMIN") {
        navigate("/admin");
      }
      if (user.role === "USER") {
        toast.error("คุณไม่มีสิทธิ์เข้าถึง", {
          position: "bottom-right",
        });
        actionLogout();
      }
    } else {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res: any = await actionLogin(form);

      if (res.data.user.role !== "ADMIN") {
        toast.error("คุณไม่มีสิทธิ์เข้าถึง", {
          position: "bottom-right",
        });
        await actionLogout();
        return;
      }

      if (res.data.user.role === "ADMIN") {
        toast.success("เข้าสู่ระบบสำเร็จ", {
          position: "bottom-right",
        });
        navigate("/admin");
      }
    } catch (error) {
      const errorMessage = (error as any).message || "เกิดข้อผิดพลาด";
      toast.error(errorMessage, {
        position: "bottom-right",
      });
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="bg-[#1A0040] w-full h-[39px] flex justify-center items-center fixed top-0 z-10">
        <img src={topLogo} alt="Logo" className="h-2/4 object-contain" />
      </div>
      <div className="w-[370px] h-[430px] bg-[#1A0040] mt-[39px] rounded-xl flex flex-col justify-center items-center shadow-lg">
        <div>
          <h1 className="font-prompt font-bold text-4xl text-white">
            เข้าสู่ระบบ
          </h1>
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center"
          >
            <div className="flex flex-col mt-10 gap-5">
              <div className="flex flex-col relative">
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  type="email"
                  id="email"
                  className="pl-14 text-xl font-prompt w-[323px] h-[50px] rounded-full mt-2 px-3 bg-[#E9E6E1] placeholder:text-[#AFAFAF] "
                  placeholder="อีเมล"
                />
                <div className="absolute top-2 left-1 h-[50px] flex items-center">
                  <div className="w-[45px] h-[45px] rounded-full bg-[#D2B589] flex justify-center items-center">
                    <img
                      className="w-[25px] h-[25px]"
                      src="https://s3-alpha-sig.figma.com/img/6cc6/06bf/5a47d74f34b1e5dc5f501e69893d03c6?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=tItEbFbtjeIL6~3ahsUMuWY~Y1RndD6pMQpeVxuO65Wg0po8XvPamOya1LkJgnrl5EkgO-7uSMJf5vYxeSd2pa-e8eWPSjLzfiTj6uDpSZzW05OgvEboaVbA7YDne42lNOQCbxWpCTbVIjJkFYDYk6ltPM6tSrBB~Z75Z4ma7JTuckyUmBI0bilYGmQ0OVcLabQh22-ACy4JcbqQwmw0ivDJyZJDvrVdI0GCZyDgTBgF7CIl3~MAUKjGTyUXBWHom8naLrTe3nfakgd470PVO4ORyqoyRk-RtGKm1CG1zqDew5XE1d2-ZpaThn7VPVkDyTJxQjWhhtQbBZlkPlze8g__"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col relative">
                <input
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  type="password"
                  id="password"
                  className="pl-14 text-xl font-prompt w-[323px] h-[50px] rounded-full mt-2 px-3 bg-[#E9E6E1] placeholder:text-[#AFAFAF] "
                  placeholder="รหัสผ่าน"
                />
                <div className="absolute top-2 left-1 h-[50px] flex items-center">
                  <div className="w-[45px] h-[45px] rounded-full bg-[#D2B589] flex justify-center items-center">
                    <img
                      className="w-[25px] h-[25px]"
                      src="https://s3-alpha-sig.figma.com/img/f2a3/ebaa/91bb679e25acdea47cf973c27ada7c09?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Fhg5BqSUt-fH6az6cr3AlPSTO0Jk01jDqV-paFHZTwYqafHn73OsSqCgCMvuYa92cGPjho~yYK8lRDywv5uJmmjskAzcuB90R6OGt31ZzsFR0KyIOYiUKMxp1ucwW9M0ctigz2eqYBABWOCdOiB-0gGRLSnqLbI5lKUEAlxAt8W0dl2aQt7ifaJf5PqXqoSDwOrmoNO2trI~QPbhhPWkYqWQ8Z8asitpdCap61UssTLdpvlpRPVunGN3FlVDRUNwBp6I6riLAXBcWDn587QkSzXx~-vZH6gE1lVj1gpGgALi~PSQ~kvnhXyjRYKLSW6y45W0OqpHOuCCfOtdWJ1rcg__"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button className="w-1/2 h-[50px] bg-[#D2B589] text-white  rounded-full mt-12 font-prompt font-bold text-xl ">
              เข้าสู่ระบบ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
