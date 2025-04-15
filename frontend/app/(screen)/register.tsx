import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

const register = () => {
  const router = useRouter(); // Use the router from expo-router

  return (
    <View className="flex-1 flex items-center justify-center relative w-full">
      <Image
        source={require("@/assets/images/regisbg.png")}
        className="w-full h-full"
        resizeMode="cover"
      />

      <View className="absolute top-14 left-6 z-30">
        <TouchableOpacity
          onPress={() => router.push("/(tabs)")}
          className="flex-row items-center"
        >
          <AntDesign name="arrowleft" size={40} color="white" />
          <Text className="font-bold text-2xl text-white font-Prompt ml-3">
            ย้อนกลับ
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default register;
