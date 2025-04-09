import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import EditProfileForm from "../components/EditProfileForm";
import Constants from "expo-constants";
import { useAuthStore } from "@/store/authStore";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const API_URL = Constants.expoConfig?.extra?.API_URL;

const EditProfileScreen = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const refreshUser = useAuthStore((state) => state.refreshUser);

  const imageUri = `${API_URL?.replace(/\/api$/, "")}/uploads/${user?.image}`;

  const updateProfileImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("กรุณาอนุญาตการเข้าถึงคลังรูปภาพ");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      const uri = asset.uri;
      const filename = uri.split("/").pop() || "photo.jpg";
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      const formData = new FormData();
      formData.append("name", `${user?.name}`);
      formData.append("dateOfBirth", `${user?.dateOfBirth}`);
      formData.append("image", {
        uri,
        name: filename,
        type,
      } as any);
      formData.append("sex", `${user?.sex}`);
      formData.append("status", `${user?.status}`);

      try {
        const userId = user?.id?.trim();
        if (!userId) {
          alert("ไม่พบรหัสผู้ใช้");
          return;
        }

        await axios.put(`${API_URL}/user/${userId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        await refreshUser();
        alert("อัปโหลดรูปภาพสำเร็จ");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "เกิดข้อผิดพลาด:",
            error.response?.data || error.message
          );
        } else {
          console.error("เกิดข้อผิดพลาด:", error);
        }
        alert("อัปโหลดรูปไม่สำเร็จ");
      }
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView>
        <View className="pl-6 pt-3">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center"
          >
            <AntDesign name="arrowleft" size={40} color="black" />
            <Text className="font-bold text-2xl font-Prompt ml-3">
              แก้ไขโปรไฟล์
            </Text>
          </TouchableOpacity>
        </View>

        <View className="bg-[#E9E6E1] w-full h-full mt-20 rounded-3xl p-6 relative">
          <View className="absolute top-[-50] left-[50%] translate-x-[-50%]">
            <View className="relative">
              <Image
                source={{ uri: imageUri }}
                className="w-[100] h-[100] rounded-full border border-black"
                resizeMode="cover"
              />
              <View className="w-[35] h-[35] bg-white rounded-full border border-black absolute bottom-0 right-[-5] flex items-center justify-center">
                <TouchableOpacity onPress={updateProfileImage}>
                  <Entypo name="camera" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <EditProfileForm />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default EditProfileScreen;
