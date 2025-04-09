import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import Zodiac from "../components/zodiac";
const name = () => {
  const { name } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView>
      <View className="pl-6 pt-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center"
        >
          <AntDesign name="arrowleft" size={40} color="black" />
          <Text className="font-bold text-2xl font-Prompt ml-3">{name}</Text>
        </TouchableOpacity>
      </View>
      {name === "ดูฤกษ์ราศี" ? <Zodiac /> : name === "ดูปีชง" ? <></> : name==="ดูไพ่ทาโร"}
    </SafeAreaView>
  );
};

export default name;
