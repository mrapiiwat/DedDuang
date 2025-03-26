import { View, Text, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";

const NewsCard: React.FC<{ picUrl: string; linkUrl: any }> = ({
  picUrl,
  linkUrl,
}) => {
  return (
    <View className="bg-white my-4 rounded-3xl h-[370]">
      <Image
        source={{ uri: picUrl }}
        className="w-full h-full rounded-3xl"
        resizeMode="cover"
      />
      <Image
        source={require("../../assets/images/Feed-Shadow.png")}
        className="absolute z-10 bottom-0 w-full h-full rounded-b-3xl"
        resizeMode="cover"
      />
      <Link href={linkUrl} className="text-white font-bold text-3xl z-20 absolute bottom-1 left-6 font-Anakotmai">
        อ่านต่อ <Text className="text-3xl"> ⬈</Text>
      </Link>
    </View>
  );
};

export default NewsCard;
