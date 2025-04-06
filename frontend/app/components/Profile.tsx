import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
const API_URL = Constants.expoConfig?.extra?.API_URL;
interface Data {
  profileImage: string;
  name: string;
}

const Profile: React.FC<{ data: Data }> = ({ data }) => {
  const router = useRouter();

  const ImgageUri = `${API_URL?.replace(/\/api$/, "")}/uploads/${data.profileImage}`;
  console.log("Image URI:", ImgageUri); // Log the image URI for debugging
  const handlePress = () => {
    router.push("/(screen)/editProfile");
  };

  return (
    <View className="flex flex-row items-center ">
      <Image
        source={{ uri: ImgageUri }}
        className="w-[75] h-[75] rounded-full border border-black"
        resizeMode="cover"
      />
      <View className=" h-[75] flex flex-col justify-center ml-4">
        <Text className="font-PromptBold text-4xl">
          {data.name.split(" ")[0]}
        </Text>
        <TouchableOpacity
          onPress={handlePress}
          className="flex flex-row items-center gap-2"
        >
          <Text className="font-Prompt">แก้ไขโปรไฟล์</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
