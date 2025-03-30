import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import Profile from "../components/Profile";
import { useRouter } from "expo-router";
import { option, imageOption } from "../../utils/option";

const data = {
  profileImage:
    "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
  name: "John Doe",
};

const home = () => {
  const router = useRouter();

  const handlePress = (item: string) => {
    const screenName = item.replace(/\s+/g, "");
    if (item === "ออกจากระบบ") {
      alert("Logging out...");
    } else if (item === "เกี่ยวกับเรา") {
      //@ts-ignore
      router.push("/(screen)/aboutus");
    } else {
      //@ts-ignore
      router.push(`/(screen)/${screenName}`);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-mybg">
      <View className="p-6">
        <Profile data={data} />
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
                <Text className="font-Anakotmai text-xl">{item}</Text>
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
