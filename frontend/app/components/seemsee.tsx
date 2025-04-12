import { ScrollView, Image, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { zodiacSign } from "@/utils/zodi";

const Seemsee = () => {
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
    image:
      "https://s3-alpha-sig.figma.com/img/ff36/c125/5c125983d48b4b985cf647d75fcaed4e?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=amy8Vy~fAXMrJriiAlzEm6IGeZzViAfjNIlydccqEf5MhLIVAkOLGd2kZPMx1Bo0sO7r7LECOuzLHq1GYzOwHBnDlvzrkF9rAwxFbx2-jC0yPgdSBC5TS6zQ2sX~lUceG36FoXADXpntdnyA9~VVPv4~shXjvDzcSE1RQWduN3bdBk1Fd3d4UXmBeVo6Rmb7Y2SKqzIVBzfPRaYh9rLwracRYxhuvRKW~QS3eQM7sPyJNLFltUCcqCxGLhJciXssmdXAi-Z2NjKTok5pKuIvwRKx5mo2OTtHJnClzC7Zy9LaosCGdW2cRaNig4uoxXTUF35CWEnz~qbMCzhA6HpK-g__",
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
      <TouchableOpacity className="bg-primary rounded-full w-40 py-2 my-5 ">
        <Text className="text-3xl font-bold text-white text-center">
        เขย่า
        </Text>
      </TouchableOpacity>
      <ScrollView className="bg-[##E9E6E1] p-10 rounded-t-[50] w-full h-[80%] ">
        <Text className="text-lg font-Prompt text-center mb-5">
          {mockData.text}
        </Text>
      </ScrollView>
    </View>
  );
};

export default Seemsee;
