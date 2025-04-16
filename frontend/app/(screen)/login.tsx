import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { loginImage } from "../../utils/loginImage";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import AntDesign from "@expo/vector-icons/AntDesign";

const login = () => {
  const login = useAuthStore((state) => state.login);
  const user = useAuthStore((state) => state.user);

  interface User {
    email: string;
    password: string;
  }

  const [userData, setUserData] = useState<User>({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();

  const handleLogin = async (userData: User) => {
    if (!userData.email || !userData.password) {
      setErrorMsg("กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }

    try {
      setErrorMsg(""); // ล้าง error ก่อน
      await login(userData.email, userData.password);
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/(tabs)/home");
    }
  }, [user]);

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

      <View className="absolute top-14 left-6 z-30">
        <TouchableOpacity
          onPress={() => router.push("/(tabs)")}
          className="flex-row items-center"
        >
          <AntDesign name="arrowleft" size={40} color="black" />
          <Text className="font-bold text-2xl font-Prompt ml-3">ย้อนกลับ</Text>
        </TouchableOpacity>
      </View>

      <View className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
        <View className="bg-primary w-[370] h-[512] rounded-2xl flex flex-col items-center justify-around">
          <View className="mt-10 p-1 flex items-center justify-center">
            <Text className="text-white font-Prompt text-6xl text-center">
              เข้าสู่ระบบ
            </Text>
          </View>

          <View className="gap-8">
            <View className="relative w-[300] h-[60]">
              <TextInput
                placeholder="อีเมล"
                className="w-full h-full bg-white mb-4 rounded-full text-2xl font-Prompt pl-20"
                onChangeText={(text) =>
                  setUserData({ ...userData, email: text })
                }
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <View className="absolute top-1/2 -translate-y-1/2 left-1 bg-secondary h-[50] w-[50] rounded-full flex items-center justify-center">
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
                secureTextEntry
                onChangeText={(text) =>
                  setUserData({ ...userData, password: text })
                }
              />
              <View className="absolute top-1/2 -translate-y-1/2 left-1 bg-secondary h-[50] w-[50] rounded-full flex items-center justify-center">
                <Image
                  source={{ uri: loginImage[1] }}
                  className="w-[32] h-[32]"
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>

          {errorMsg ? (
            <Text className="text-red-500 font-Prompt text-center px-5 mt-2">
              {errorMsg}
            </Text>
          ) : null}

          <View>
            <TouchableOpacity
              className="bg-secondary p-5 rounded-full w-[200] h-[60] flex items-center justify-center"
              onPress={() => handleLogin(userData)}
            >
              <Text className="text-white font-Prompt text-2xl">
                เข้าสู่ระบบ
              </Text>
            </TouchableOpacity>

            <TouchableOpacity>
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
