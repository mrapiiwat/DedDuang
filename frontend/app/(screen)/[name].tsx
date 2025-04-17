import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import CursedYear from "../components/cursedYear";
import Tarot from "../components/tarot";
import Seemsee from "../components/seemsee";
import About from "../components/about";
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
      {name === "ดูฤกษ์ราศี" ? (
        //@ts-ignore
        <Zodiac />
      ) : name === "ดูปีชง" ? (
        <CursedYear />
      ) : name === "ดูไพทาโรต์" ? (
        <Tarot />
      ) : name === "เสี่ยงเซียมซี" ? (
        <Seemsee />
      ) : name === "เกี่ยวกับเรา" ? (
        <About />
      ) : (
        <Text>Not found 404</Text>
      )}
    </SafeAreaView>
  );
};

export default name;
