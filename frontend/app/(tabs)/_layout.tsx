import { Tabs, usePathname, Redirect } from "expo-router";
import TabBar from "@/app/components/TabBar";
import { useAuth } from "@/hooks/useAuth";

const TabsLayout = () => {
  const { user } = useAuth();
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
