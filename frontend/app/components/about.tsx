import { View, Image, Text, ScrollView } from "react-native";
import React from "react";

const About = () => {
  return (
    <ScrollView>
      <View className="p-10 flex justify-center items-center gap-10">
        <View className="bg-[#E9E6E1] rounded-2xl p-10">
          <Image
            source={{
              uri: "https://s3-alpha-sig.figma.com/img/f169/25b0/9fd5f78cb8c11236c26fda324a12036c?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qbUS7Kvs1ELvO6~dYMBm3oAjecz9Cn89fGPdvqx3kbjyezypHtOnANkj-mt-oJ8rlupo34bFZmTaFLMW4I21DAaiLr8yOvFoPIE8m5XGsEBrDhbBHmItYvzeca~Ru~HHrLrnEkFUyF4ng887MIXah~EzbXQGotaSeshWAro2xGa8v1BkLL7WX7ZOkCzBe39zHZ0pZd3m~rUgBXvh32l2BFw3jc8ic9WTiM8MNwv5V3TMLKvpdglPhznkCU8EOLoYvn08rhQ-PV9NINwQjT5zQC1dYk1fa6RqqJKS06UvD28amsPE~y8S-2-Ui5NE~lBJ65z2Q4nraFokWjheYXYsQw__",
            }}
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
            source={{
              uri: "https://s3-alpha-sig.figma.com/img/3175/d768/8dfb10f91d0083e04eb3cb3c8483371d?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=tURYlS4E4FtUe~XuPZkYEQyfoYSam8-Kw80E8hBPTxp1BFhtgYifIU2w4EIXe44HKf2FqF6Sn7gUMZB3nTQxEKZxJovr-BYx5NI~NDNaPlo1cY3gXCGQRd~KqD4Ui-bvFUoVF7W3kCB0~x~8~oBM9xTx7Xk~M-9m7UvKL~1Mf59-r1D5lm4vHOhcs3Bgka7FgeFbuqnD-tAf~~lo-l5e327nPBRvrgr3VAq7JztQiQGDxLxDksRa2HOQ1nopAOk-~3OaVRMZy2VJ8bWJKi-fqp4poFqEM02u1L-IB1pYBqVh5yo93Pe4xkl0hTDYARWnB1K7YhtusyJ6oWueflzJuA__",
            }}
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
