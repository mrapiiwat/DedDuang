import React, { useState, useEffect } from "react";
import { cuurrentAdmin } from "../api/auth";
import useAuthStore from "../store/authStore";
import LoadingToRedirect from "./LoadingToRedirect";

interface ProtectRouteProps {
  element: React.ReactElement;
}

const ProtectRoute: React.FC<ProtectRouteProps> = ({ element }) => {
  const [pass, setPass] = useState(false);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) {
      cuurrentAdmin()
        .then((res) => {
          setPass(true);
          console.log(res.data);
        })
        .catch((error) => {
          console.error(error);
          setPass(false);
        });
    }
  }, []);

  return pass ? element : <LoadingToRedirect />;
};

export default ProtectRoute;
