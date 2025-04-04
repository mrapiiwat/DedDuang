import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { loginImage } from "../../utils/loginImage";
import { useRouter } from "expo-router";

const login = () => {
  const { login } = useAuth(); // Assuming useAuth provides a signIn function
  const userData = { id: "1", name: "John Doe" }; // Example user data
  interface User {
    id: string;
    name: string;
  }

  const router = useRouter(); // Use the router from expo-router
  const handleLogin = (userData: User) => {
    if (!userData) {
      console.log("No user data provided");
      return;
    }
    login(userData); // Call the signIn function when the button is pressed
    
    console.log("Login successful", userData);
    router.push("/home"); // Navigate to the home screen after login
  };

  return (
    <View className="flex-1 flex items-center justify-center relative">
      <Image
        source={require("@/assets/images/Shadow-Barrier-Top.png")}
        className="w-full h-40 absolute top-0 z-10"
        resizeMode="cover"
      />
      <Image
        source={require("@/assets/images/login-bg.png")}
        className="w-full h-full"
        resizeMode="contain"
      />
      <Image
        source={require("@/assets/images/Shadow-Barrier-Bottom.png")}
        className="w-full h-40 absolute bottom-0 z-20"
        resizeMode="cover"
      />
      <View className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
        <View className="bg-primary w-[370] h-[512] rounded-2xl flex flex-col items-center justify-around">
          <View className="mt-10 p-1">
            <Text className="text-white font-PromptBold text-5xl">
              เข้าสู่ระบบ
            </Text>
          </View>
          <View className="gap-8">
            <View className="relative w-[300] h-[60] ">
              <TextInput
                placeholder="อีเมล"
                className="w-full h-full bg-white mb-4 rounded-full text-2xl font-Prompt pl-20"
                onChangeText={(text) => console.log(text)}
              />
              <View className=" absolute top-1/2 -translate-y-1/2 left-1  bg-secondary h-[50] w-[50] rounded-full flex items-center justify-center">
                <Image
                  source={{ uri: loginImage[0] }}
                  className="w-[32] h-[32]"
                  resizeMode="contain"
                />
              </View>
            </View>
            <View className="relative w-[300] h-[60]">
              <TextInput
                placeholder="รหัสผ่าน"
                className="w-full h-full bg-white mb-4 rounded-full text-2xl font-Prompt pl-20"
                secureTextEntry={true}
                onChangeText={(text) => console.log(text)}
              />
              <View className=" absolute top-1/2 -translate-y-1/2 left-1  bg-secondary h-[50] w-[50] rounded-full flex items-center justify-center">
                <Image
                  source={{ uri: loginImage[1] }}
                  className="w-[32] h-[32]"
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity
              className="bg-secondary p-5 rounded-full w-[200] h-[60] flex items-center justify-center"
              onPress={() => handleLogin(userData)}
            >
              <Text className="text-white font-Prompt text-2xl">
                เข้าสู่ระบบ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="">
              <Text className="text-white font-Prompt text-xl underline text-center mt-8">
                ยังไม่ได้เป็นสมาชิก ?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default login;
