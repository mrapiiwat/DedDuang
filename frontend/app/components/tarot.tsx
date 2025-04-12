import { ScrollView, Image, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { zodiacSign } from "@/utils/zodi";

const Tarot = () => {
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
      "https://s3-alpha-sig.figma.com/img/e416/0d93/75f22f0b9112f79dc7efae0f9dc2206a?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=enAxe~07y3O2lUfIsHw~Gw5eRu0TlQHY680RQtrcUs8-Uou3fgOzYA6HPW1MUo3jjPbO96sOsDaw834-DAvfFMY6OapwN-KvsRUslCXdZNWfH7j42vx4comQnrSY3oC2meeP2VM~IUDXej3pwqQtnV1~1Yt5OaABgnaMvuCRdsGJsIgZNHuNdtrwjEeq454mEOwALUksKhtnLRxjQea0WqwAsjgOaYhCbjFAU8D-Kd1WfXzQp7NCppfOl~mQRcZgj~dmN-6xmiifFRNBcPLq2sowbV695Xwt4aPSVkbCuAZEpLz5WqqkFLskAaKQiun7fuOQdQ-UO8JfJBa3Lk60Lg__",
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
      <TouchableOpacity className="bg-primary rounded-full w-40 py-2 my-5">
        <Text className="text-3xl font-bold text-white text-center">
          สุ่มไพ่
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

export default Tarot;
