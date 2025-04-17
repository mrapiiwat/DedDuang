import {
  ScrollView,
  Image,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import Constants from "expo-constants";
import axios from "axios";
import { mockData } from "../../utils/seemsee";

const API_URL = Constants.expoConfig?.extra?.API_URL;

interface SeemseeProps {
  name: string;
  image: string;
  description: string;
}

const Seemsee = () => {
  const user = useAuthStore((state) => state.user);
  const [seemsee, setSeemsee] = useState<SeemseeProps>();
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    alert("กรุณาเข้าสู่ระบบก่อน");
    return null;
  }

  const handleRandomPress = async () => {
    try {
      if (count === 1) {
        alert("สามารถเขย่าได้อีกครั้งภายหลัง");
        return;
      }

      setIsLoading(true);
      const randomnum = Math.floor(Math.random() * (62 - 35 + 1)) + 35;
      const response = await axios.get(`${API_URL}/item/${randomnum}`);
      setCount((prev) => prev + 1);
      setSeemsee(response.data.data);
    } catch (error) {
      console.error("Error fetching tarot data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex justify-center items-center mt-10">
      {isLoading ? (
        <View className="w-[199] h-[199] flex items-center justify-center">
          <ActivityIndicator size="large" color="#000" />
          <Text className="mt-2 font-Prompt text-gray-500">กำลังเขย่า...</Text>
        </View>
      ) : (
        <Image
          source={{ uri: seemsee?.image || mockData.image }}
          style={{ width: 199, height: 199 }}
          resizeMode="contain"
        />
      )}

      <TouchableOpacity
        onPress={handleRandomPress}
        className={
          count === 1
            ? "bg-[#E9E6E1] rounded-full w-40 py-2 my-5"
            : "bg-primary rounded-full w-40 py-2 my-5"
        }
        disabled={isLoading}
      >
        <Text className="text-3xl font-bold text-white text-center">
          {count === 3 ? "เสร็จสิ้น" : "เขย่า"}
        </Text>
      </TouchableOpacity>

      <Text className="text-sm mb-4 text-gray-400 font-Prompt">
        {count === 1 ? "สามารถเขย่าได้อีกครั้งภายหลัง" : "กดเพื่อเขย่าเซียมซี"}
      </Text>

      <ScrollView className="bg-[##E9E6E1] p-10 rounded-t-[50] w-full h-[80%] ">
        <Text className="text-2xl font-Prompt text-center mb-5">
          {seemsee?.name}
        </Text>
        <Text className="text-lg font-Prompt text-center mb-5">
          {seemsee?.description || mockData.text}
        </Text>
      </ScrollView>
    </View>
  );
};

export default Seemsee;
