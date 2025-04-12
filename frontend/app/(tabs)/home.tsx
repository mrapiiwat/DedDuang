import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import Profile from "../components/Profile";
import { useRouter } from "expo-router";
import { option, imageOption } from "../../utils/option";
import { useAuthStore } from "@/store/authStore"; // Assuming useAuth provides a signIn function

const home = () => {
  const refreshUser = useAuthStore((state) => state.refreshUser);

  useEffect(() => {
    const fetchUser = async () => {
      await refreshUser();
    };
    fetchUser();
  }, []);

  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handlePress = (item: string) => {
    const screenName = item.replace(/\s+/g, "");
    if (item === "ออกจากระบบ") {
      alert("ออกจากระบบเรียบร้อยแล้ว");
      logout();
    } else if (item === "เกี่ยวกับเรา") {
      //@ts-ignore
      router.push("/(screen)/เกี่ยวกับเรา");
    } else {
      //@ts-ignore
      router.push(`/(screen)/${screenName}`);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-mybg">
      <View className="p-6">
        <Profile />
        <FlatList
          data={option}
          className="bg-[#FEFFFF] w-full h-[78%] rounded-3xl mt-8 p-8"
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item)}>
              <View className="flex flex-row items-center mb-4 gap-6 ">
                <View className="w-[48] h-[48]">
                  <Image
                    source={{ uri: imageOption[option.indexOf(item)] }}
                    className="w-[40] h-[40] "
                    resizeMode="contain"
                  />
                </View>
                <Text className="font-Prompt text-xl">{item}</Text>
              </View>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default home;
