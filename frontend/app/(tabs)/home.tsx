import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Profile from "../components/Profile";

const data = {
  profileImage:
    "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
  name: "John Doe",
};

const bruh = [
  "ดูฤกษ์ราศี",
  "ดูปีชง",
  "ดูไพทาโรต์",
  "เสี่ยงเซียมซี",
  "เกี่ยวกับเรา",
  "ออกจากระบบ",
];

const home = () => {
  return (
    <SafeAreaView className="flex-1 bg-mybg">
      <View className="p-6">
        <Profile data={data} />
        <FlatList
          data={bruh}
          className="bg-[#FEFFFF] w-full h-[78%] rounded-3xl mt-8 p-8"
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="flex flex-row items-center mb-4 gap-6 ">
              <View className="w-[48] h-[48] bg-[#D9D9D9] rounded-full"></View>
              <TouchableOpacity>
                <Text className="font-Anakotmai text-xl">{item}</Text>
              </TouchableOpacity>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default home;
