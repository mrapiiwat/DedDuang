import {
  ScrollView,
  Image,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import Constants from "expo-constants";
import axios from "axios";

const API_URL = Constants.expoConfig?.extra?.API_URL;

interface TarotProps {
  name: string;
  image: string;
  description: string;
}

const Tarot = () => {
  const user = useAuthStore((state) => state.user);
  const [tarot, setTarot] = useState<TarotProps>();
  const [count, setCount] = useState<number>(0);
  const [card, setCard] = useState<TarotProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    alert("กรุณาเข้าสู่ระบบก่อน");
    return null;
  }

  if (count === 3) {
    Alert.alert('การ์ดที่ได้',`\n ${card.map((item) => item.name).join("\n ")}`);
  }

  const handleRandomPress = async () => {
    try {
      if (count === 3) {
        alert("สุ่มไพ่ครบ 3 ครั้งแล้ว");
        return;
      }

      setIsLoading(true);
      const randomnum = Math.floor(Math.random() * (34 - 13 + 1)) + 13;
      const response = await axios.get(`${API_URL}/item/${randomnum}`);
      setCount((prev) => prev + 1);
      setTarot(response.data.data);
      setCard((prevCards) => [...prevCards, response.data.data]);
    } catch (error) {
      console.error("Error fetching tarot data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const mockData = {
    image:
      "https://s3-alpha-sig.figma.com/img/e416/0d93/75f22f0b9112f79dc7efae0f9dc2206a?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=enAxe~07y3O2lUfIsHw~Gw5eRu0TlQHY680RQtrcUs8-Uou3fgOzYA6HPW1MUo3jjPbO96sOsDaw834-DAvfFMY6OapwN-KvsRUslCXdZNWfH7j42vx4comQnrSY3oC2meeP2VM~IUDXej3pwqQtnV1~1Yt5OaABgnaMvuCRdsGJsIgZNHuNdtrwjEeq454mEOwALUksKhtnLRxjQea0WqwAsjgOaYhCbjFAU8D-Kd1WfXzQp7NCppfOl~mQRcZgj~dmN-6xmiifFRNBcPLq2sowbV695Xwt4aPSVkbCuAZEpLz5WqqkFLskAaKQiun7fuOQdQ-UO8JfJBa3Lk60Lg__",
    text: "กดปุ่มด้านบนเพื่อสุ่มไพ่ทาโรต์",
  };

  return (
    <View className="flex justify-center items-center mt-10">
      {isLoading ? (
        <View className="w-[199] h-[199] flex items-center justify-center">
          <ActivityIndicator size="large" color="#000" />
          <Text className="mt-2 font-Prompt text-gray-500">กำลังสุ่มไพ่...</Text>
        </View>
      ) : (
        <Image
          source={{ uri: tarot?.image || mockData.image }}
          style={{ width: 199, height: 199 }}
          resizeMode="contain"
        />
      )}

      <TouchableOpacity
        onPress={handleRandomPress}
        className={
          count === 3
            ? "bg-[#E9E6E1] rounded-full w-40 py-2 my-5"
            : "bg-primary rounded-full w-40 py-2 my-5"
        }
        disabled={isLoading}
      >
        <Text className="text-3xl font-bold text-white text-center">
          {count === 3 ? "เสร็จสิ้น" : "สุ่มไพ่"}
        </Text>
      </TouchableOpacity>

      <Text className="text-sm mb-4 text-gray-400 font-Prompt">
        สุ่มได้อีก {count}/3
      </Text>

      <ScrollView className="bg-[##E9E6E1] p-10 rounded-t-[50] w-full h-[80%] ">
        <Text className="text-3xl font-Prompt text-center mb-5">
          {tarot?.name}
        </Text>
        <Text className="text-lg font-Prompt text-center mb-5">
          {tarot?.description || mockData.text}
        </Text>
      </ScrollView>
    </View>
  );
};

export default Tarot;
