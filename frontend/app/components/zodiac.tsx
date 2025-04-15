import { ScrollView, Image, Text, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { zodiacSign } from "@/utils/zodi";
import Constants from "expo-constants";
import axios from "axios";
import { useRouter } from "expo-router";

const API_URL = Constants.expoConfig?.extra?.API_URL;

interface ZodiacData {
  name: string;
  image: string;
  description: string;
}

const Zodiac = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const refreshUser = useAuthStore((state) => state.refreshUser);
  const [Zodiac, setZodiac] = useState<ZodiacData>();
  const [isLoading, setIsLoading] = useState(true);

  if (!user) {
    alert("กรุณาเข้าสู่ระบบก่อน");
    return null;
  }

  if (!user.dateOfBirth) {
    alert("กรุณาเพิ่มวันเกิดก่อน");
    return router.push("/(screen)/editProfile");
  }

  const { dateOfBirth } = user;
  const date = new Date(dateOfBirth);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const resZodi = zodiacSign(month, day);

  const fetchZodiac = async () => {
    try {
      if (!API_URL) throw new Error("API_URL is not defined");

      const res = await axios.get(`${API_URL}/item/${resZodi}`);
      setZodiac(res.data.data);
    } catch (error) {
      console.error("Error fetching zodiac:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
    fetchZodiac();
  }, []);

  return (
    <View className="flex justify-center items-center mt-10">
      {isLoading ? (
        <View className="w-[199] h-[199] flex items-center justify-center">
          <ActivityIndicator size="large" color="#000" />
          <Text className="mt-2 font-Prompt text-gray-500">กำลังโหลด...</Text>
        </View>
      ) : (
        <>
          <Image
            source={{ uri: Zodiac?.image }}
            style={{ width: 199, height: 199 }}
            resizeMode="contain"
          />
          <Text className="my-10 text-4xl font-bold">{Zodiac?.name}</Text>
        </>
      )}

      <ScrollView className="bg-[##E9E6E1] p-10 rounded-t-[50] w-full h-[80%] ">
        <Text className="text-lg font-Prompt text-center mb-5">
          {Zodiac?.description}
        </Text>
      </ScrollView>
    </View>
  );
};

export default Zodiac;
