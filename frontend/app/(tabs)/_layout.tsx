import { Tabs, usePathname, Redirect } from "expo-router";
import TabBar from "@/app/components/TabBar";
import { useAuthStore } from "@/store/authStore";

import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const TabsLayout = () => {
  const user = useAuthStore((state) => state.user);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const logout = useAuthStore((state) => state.logout);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        logout();
        return;
      }
      const decodedToken: any = jwtDecode(token as string);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        logout();
      } else {
        checkAuth();
      }
    };
    checkToken();
  }, []);

  const pathname = usePathname();

  const protectedRoutes = ["/home", "/seer"];

  if (!user && protectedRoutes.includes(pathname)) {
    return <Redirect href="/(screen)/login" />;
  }

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    />
  );
};

export default TabsLayout;
