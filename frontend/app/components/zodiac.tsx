import { ScrollView, Image, Text, View } from "react-native";
import React, { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { zodiacSign } from "@/utils/zodi";
const Zodiac = () => {
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
      "https://s3-alpha-sig.figma.com/img/71dc/6721/d7f9d352f744382136cc99a06b45bd61?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QMewktjp6XoMt3W6Bbhgwuhb81fvAqbtsHRUCnsN2R7d6w~zDqbmgR4zyBQGOmpQ-C1m2BJx2l2N9~v0rNYhTXpd30el-aGyPFmSTQ1JZTtxRzbuq434uYGbj~E5IsburVFXujyBWA7R4CiMd0c-3C9zHkarpHkG1hxXnkqgAKfziaoxAPimLAbLsTezDhe3hYONTTgQYi1--JcdunNnwdIgT43S8oVLLdEdrEwVLZV8ADeE3ztplWufTD0YBxwM3XUmaDg0t6CZ~~gVsmCVgNk9buHvHWIep-10MDIAN-ud6ob9hgFi0PyVQe9d-wnb6MIx1Rl56UE~zM~iDGrYlw__",
    text: "ราศีเมถุนหรือราศีคนคู่เป็นดาวที่อยู่ใต้อิทธิพลของดาวพุธหรือเมอร์คิวรี (Mercury) ซึ่งเป็นเทพแห่งการสื่อสาร มีของวิเศษเป็นรองเท้าและหมวกมีปีก ซึ่งถือเป็นตัวแทนของอุปนิสัยที่รู้จักปรับตัวและยืดหยุ่น ผู้ที่อยู่ในราศีนี้จึงรู้จักวิธีรับมือกับสถานการณ์ทุกประเภท แม้บางทีจะดูเหมือนโชคชะตาเล่นตลกแต่คนกลุ่มนี้ก็ยังรู้จักปรับตัวให้เข้ากับสิ่งรอบข้าง หรือแม้กระทั่งปรับความคิดและหลักจริยธรรมให้สอดคล้องกับโลกที่เปลี่ยนแปลงได้ ส่วนลักษณะนิสัยในทางลบของราศีนี้คือ การเป็นคนร้อนรน ขี้กระวนกระวายใจ การจะทำความเข้าใจคนในราศีนี้ให้ถ่องแท้เป็นเรื่องยาก เพราะราศีนี้ประกอบด้วยสติปัญญาและความรอบรู้เป็นจุดเด่น และมีความสนุกสนานร่าเริงอย่างวัยหนุ่มสาวเป็นอุปนิสัยโดยธรรมชาติ เมอร์คิวรี นอกจากถือเป็นเทพแห่งการสื่อสารแล้ว ยังมาพร้อมกับคุณสมบัติด้านวิทยาศาสตร์ การค้าขาย เป็นนักคิด อยากรู้อยากเห็น และการเดินทางด้วย ในด้านหนึ่งคนในราศีนี้สามารถโกหกคนได้อย่างหน้าตาย แต่ในอีกด้านหนึ่งหากมีใครมาหลอกลวงก็สามารถรู้ได้ทะลุปรุโปร่งเช่นกัน",
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
      <ScrollView className="bg-mybg p-10 rounded-t-[60] w-full h-[80%] mt-5 ">
        <Text className="text-lg font-Prompt text-center mb-5">
          {mockData.text}
        </Text>
      </ScrollView>
    </View>
  );
};

export default Zodiac;
