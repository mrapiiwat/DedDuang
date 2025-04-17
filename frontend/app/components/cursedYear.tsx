import { ScrollView, Image, Text, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import Constants from "expo-constants";
import axios from "axios";
import { useRouter } from "expo-router";

const API_URL = Constants.expoConfig?.extra?.API_URL;

interface CursedData {
  name: string;
  image: string;
  description: string;
  cursedPercent: number;
}

const zodiacList = [
  "ชวด", "ฉลู", "ขาล", "เถาะ", "มะโรง", "มะเส็ง",
  "มะเมีย", "มะแม", "วอก", "ระกา", "จอ", "กุน",
] as const;

type Zodiac = typeof zodiacList[number];

const zodiacIdMap: Record<string, number> = {
  ชวด: 64,
  ฉลู: 65,
  ขาล: 66,
  เถาะ: 67,
  มะโรง: 68,
  มะเส็ง: 69,
  มะเมีย: 70,
  มะแม: 71,
  วอก: 72,
  ระกา: 73,
  จอ: 74,
  กุน: 63,
};

const baseYear = 2020; // 2020 คือปีชวด

const CursedYear = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const refreshUser = useAuthStore((state) => state.refreshUser);
  const [zodiac, setZodiac] = useState<CursedData>();
  const [isLoading, setIsLoading] = useState(true);

  if (!user) {
    alert("กรุณาเข้าสู่ระบบก่อน");
    return null;
  }

  if (!user.dateOfBirth) {
    alert("กรุณาเพิ่มวันเกิดก่อน");
    return router.push("/(screen)/editProfile");
  }

  const getZodiacFromYear = (year: number) => {
    const index = (year - baseYear) % 12;
    return zodiacList[(index + 12) % 12]; 
  };

  // คำนวณเปอร์เซ็นต์ชงแบบยืดหยุ่น
  const getCursedPercentage = (userZodiac: Zodiac, currentZodiac: Zodiac): number => {
    if (userZodiac === currentZodiac) return 100;

    const zodiacIndex = zodiacList.indexOf(currentZodiac);
    const oppositeIndex = (zodiacIndex + 6) % 12;
    const mildIndex1 = (zodiacIndex + 4) % 12;
    const mildIndex2 = (zodiacIndex + 8) % 12;

    const opposite = zodiacList[oppositeIndex]; // ชงหลัก 100%
    const mild1 = zodiacList[mildIndex1]; // ชงรอง 75%
    const mild2 = zodiacList[mildIndex2]; // ชงรอง 50%

    if (userZodiac === opposite) return 100;
    if (userZodiac === mild1) return 75;
    if (userZodiac === mild2) return 50;

    return 10; // อย่างน้อยมีดวงชงเล็กน้อย
  };

  const fetchZodiac = async () => {
    try {
      if (!API_URL) throw new Error("API_URL is not defined");

      const birthYear = new Date(user.dateOfBirth).getFullYear();
      const userZodiac = getZodiacFromYear(birthYear);

      const currentYear = new Date().getFullYear();
      const currentZodiac = getZodiacFromYear(currentYear);

      const cursedPercent = getCursedPercentage(userZodiac, currentZodiac);

      const zodiacId = zodiacIdMap[userZodiac];
      if (!zodiacId) throw new Error("ไม่พบ ID สำหรับปี " + userZodiac);

      const res = await axios.get(`${API_URL}/item/${zodiacId}`);
      const data = res.data.data;

      setZodiac({
        name: userZodiac,
        image: data.image,
        description: data.description,
        cursedPercent,
      });
    } catch (error) {
      console.error("Error fetching cursed zodiac:", error);
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
            source={{ uri: zodiac?.image }}
            style={{ width: 199, height: 199 }}
            resizeMode="contain"
          />
          <Text className="mt-5 mb-3 text-4xl font-PromptMedium">ปี{zodiac?.name}</Text>
          <Text className="text-lg text-red-500 font-Prompt mb-3">
            ปีนี้ชง {zodiac?.cursedPercent}%
          </Text>
        </>
      )}

      <ScrollView className="bg-[#E9E6E1] p-10 rounded-t-[50] w-full h-[80%]">
        <Text className="text-lg font-Prompt text-center mb-5">
          {zodiac?.description}
        </Text>
      </ScrollView>
    </View>
  );
};

export default CursedYear;
