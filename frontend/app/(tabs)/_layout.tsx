import { Tabs, usePathname, Redirect } from "expo-router";
import TabBar from "@/app/components/TabBar";
import { useAuthStore } from "@/store/authStore";

const TabsLayout = () => {
  const  user  = useAuthStore((state) => state.user);
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
