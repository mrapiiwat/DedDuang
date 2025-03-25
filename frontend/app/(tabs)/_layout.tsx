import TabBar from "@/app/components/TabBar";
import { Tabs } from "expo-router";
const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
    </Tabs>
  );
};

export default TabsLayout;
