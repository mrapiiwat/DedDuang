import { View, Text, TextInput } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

const seer = () => {
  return (
    <View className="flex-1 items-center justify-center bg-[#E9E6E1] p-10 pb-36 pt-20">
      <View className="bg-[#F2F2F2] rounded-3xl w-full h-full relative p-5">
        <View className="absolute bottom-7 left-0 right-0 px-8">
          <View className="relative justify-center">
            <TextInput className="h-16 border boerder-[#1A0040] rounded-full p-4 text-2xl font-Prompt" />
            <View className="absolute right-2  bg-[#D2B589] rounded-full p-3">
              <AntDesign name="arrowup" size={24} color="white" />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default seer;
