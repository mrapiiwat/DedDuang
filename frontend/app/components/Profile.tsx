import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import { useAuthStore } from "@/store/authStore";

const API_URL = Constants.expoConfig?.extra?.API_URL;

const Profile: React.FC = () => {
  const refreshUser = useAuthStore((state) => state.refreshUser);
  const data = useAuthStore((state) => state.user);
  const router = useRouter();

  const ImgageUri = `${API_URL?.replace(/\/api$/, "")}/uploads/${data?.image}`;

  const handlePress = async () => {
    await refreshUser();
    router.push("/(screen)/editProfile");
  };

  return (
    <View className="flex flex-row items-center ">
      <Image
        source={{
          uri:
            ImgageUri == null
              ? data?.sex === "ชาย"
                ? "https://avatar.iran.liara.run/public/boy?username=Ash"
                : "https://avatar.iran.liara.run/public/92"
              : ImgageUri,
        }}
        className="w-[75] h-[75] rounded-full border border-black"
        resizeMode="cover"
      />
      <View className=" h-[75] flex flex-col justify-center ml-4">
        <Text className="font-PromptBold text-4xl">
          {data?.email ? data.email.split("@")[0] : data?.name?.split(" ")[0]}
        </Text>
        <TouchableOpacity
          onPress={handlePress}
          className="flex flex-row items-center gap-2 relative"
        >
          {ImgageUri == null && data?.name == null ? (
            <View className="absolute top-[-1] left-[-7] w-2 h-2 bg-red-600 rounded-full" />
          ) : null}
          <Text className="font-Prompt">แก้ไขโปรไฟล์</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
