import { View, Text, Image } from "react-native";
import React from "react";

interface Data {
  profileImage: string;
  name: string;
}

const Profile: React.FC<{ data: Data }> = ({ data }) => {
  return (
    <View className="flex flex-row items-center ">
      <Image
        source={{ uri: data.profileImage }}
        className="w-[75] h-[75] rounded-full border border-black"
        resizeMode="cover"
      />
      <View className=" h-[75] flex flex-col justify-center ml-4">
        <Text className="font-Anakotmai text-3xl">{data.name}</Text>
        <Text className="font-Anakotmai">แก้ไขโปรไฟล์ ➤</Text>
      </View>
    </View>
  );
};

export default Profile;
