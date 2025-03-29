import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

//@ts-ignore
import EditProfileForm from "../components/EditProfileForm";

const editProfile = () => {
  const router = useRouter();
  const data = {
    profileImage:
      "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
    name: "John Doe",
    dateOfBirth: "01/01/2000",
    timeOfBirth: "12:00",
    sex: "ชาย",
    status : "โสด",
  };

  return (
    <SafeAreaView>
      <View className="pl-6 pt-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center"
        >
          <AntDesign name="arrowleft" size={40} color="black" />
          <Text className="font-bold text-2xl font-Anakotmai ml-3">
            แก้ไขโปรไฟล์
          </Text>
        </TouchableOpacity>
      </View>

      <View className="bg-[#E9E6E1] w-full h-full mt-20 rounded-3xl p-6 relative">
        <View className="absolute top-[-50] left-[50%] translate-x-[-50%]">
          <View className="relative">
            <Image
              source={{ uri: data.profileImage }}
              className="w-[100] h-[100] rounded-full border border-black"
              resizeMode="cover"
            />
            <View className="w-[35] h-[35] bg-white rounded-full border border-black absolute bottom-0 right-[-5]"></View>
          </View>
        </View>
        <EditProfileForm data={data} />
      </View>
    </SafeAreaView>
  );
};

export default editProfile;
