import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { useRouter } from "expo-router";

const Index: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(
      () => router.push("/(tabs)"),
      2000
    );
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <Image
        source={require("../assets/images/DedDuang-LOGO.png")}
        className="w-52 h-72"
        resizeMode="contain"
      />
    </View>
  );
};

export default Index;
