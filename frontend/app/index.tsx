import React, { useEffect } from "react";
import {  Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const Index: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => router.push("/(tabs)"), 2000);
  }, []);

  return (
    <TouchableOpacity
      className="flex-1 items-center justify-center bg-primary"
      onPress={() => router.push("/(tabs)")}
    >
      <Image
        source={require("../assets/images/DedDuang-LOGO.png")}
        className="w-52 h-72"
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default Index;
