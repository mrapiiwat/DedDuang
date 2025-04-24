import { View, Image, Text, ScrollView } from "react-native";
import React from "react";

const About = () => {
  return (
    <ScrollView>
      <View className="p-10 flex justify-center items-center gap-10">
        <View className="bg-[#E9E6E1] rounded-2xl p-10">
          <Image
            source={require("../../assets/images/rif.png")}
            className="w-[257px] h-[257px] rounded-full mx-auto"
            resizeMode="cover"
          />
          <View>
            <Text className="text-2xl text-center mt-12 font-Prompt">
              นายอภิวัฒน์ ลานทอง
            </Text>
            <Text className="text-2xl text-center font-Prompt">65110977</Text>
          </View>
        </View>
        <View className="bg-[#E9E6E1] rounded-2xl p-10">
          <Image
            source={require('../../assets/images/tiaw.png')}
            className="w-[257px] h-[257px] rounded-full mx-auto"
            resizeMode="cover"
          />
          <View>
            <Text className="text-2xl text-center mt-12 font-Prompt">
              นายภูมิพัฒน์ เวฬุฬฐ์วรรณราช
            </Text>
            <Text className="text-2xl text-center font-Prompt">65111552</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default About;
