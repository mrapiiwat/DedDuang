import { ScrollView, Image, Text, View } from "react-native";
import React, { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { zodiacSign } from "@/utils/zodi";
import name from "../(screen)/[name]";

const CursedYear = () => {
  const user = useAuthStore((state) => state.user);
  const refreshUser = useAuthStore((state) => state.refreshUser);
  const [Zodiac, setZodiac] = useState<string>("");

  refreshUser();

  if (!user) {
    alert("กรุณาเข้าสู่ระบบก่อน");
    return null;
  }
  const { dateOfBirth, timeOfBirth } = user;

  const date = new Date(dateOfBirth);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  zodiacSign(month, day);

  const mockData = {
    name: "ปีกุน",
    image:
      "https://s3-alpha-sig.figma.com/img/10cd/91af/d8d1a781cf5226398720d66c281c680a?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=NGf88EYvJyi~yX6xHzCYcKaVbg0EUfFrfhTBKBiBqOWOYoWZAaK1yve3DuorCn4Szfu06SCJt7SxeQQiDRIUaJovySEh7m3gahZysKFXFi5ePV0wILtb2sPLpQ1T88tLwzEBdKa20~DpIS9TYswYJm4QwOEmB1XjSjj4yWdSv0mkSPByPONLZyFDzqVyheFOZtLuOE2O4CI480IQKu2X3X79fJLmo~sT12zGCGcD69QRJSfH-qG6gZhAQwGoBjCZ0mE2P0QvL4XVPrg2LzdfOjbxfoiO164TOe9T0Ds5WdqtEILHMpHwJQ9fb5PfEZpTzV9XIgUgN68B4M6aeo9IRQ__",
    text: "ปีชง คือปีที่ได้รับผลกระทบมากที่สุด ถือว่าจะประสบกับเคราะห์หามยามร้ายค่อนข้างหนัก ธุรกิจการเงิน การงาน โชคลาภ การลงทุนด้านต่างๆ รวมไปถึงเรื่องความรัก คู่ครองคนรัก สุขภาพต้องระวัง มีแนวโน้มเกิดความผิดพลาดมากมาย",
  };

  return (
    <View className="flex justify-center items-center mt-10">
      <Image
        source={{
          uri: mockData.image,
        }}
        style={{ width: 199, height: 199 }}
        resizeMode="contain"
      />
      <Text className="my-10 text-4xl font-bold">{mockData.name}</Text>
      <ScrollView className="bg-[##E9E6E1] p-10 rounded-t-[50] w-full h-[80%] ">
        <Text className="text-lg font-Prompt text-center mb-5">
          {mockData.text}
        </Text>
      </ScrollView>
    </View>
  );
};

export default CursedYear;
