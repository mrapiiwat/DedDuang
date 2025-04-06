import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Checkbox } from "react-native-paper";
import { useAuthStore } from "@/store/authStore";
import Constants from "expo-constants";
import axios from "axios";
import { router, useRouter } from "expo-router";

const API_URL = Constants.expoConfig?.extra?.API_URL;

const EditProfileForm: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [dateOfBirth, setDateOfBirth] = useState(
    new Date(user?.dateOfBirth ? user.dateOfBirth : new Date())
  );
  const [timeOfBirth, setTimeOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [unknownTime, setUnknownTime] = useState(false);
  const [sex, setSex] = useState<string>(user?.sex === "ชาย" ? "ชาย" : "หญิง");
  const [status, setStatus] = useState<string>(
    user?.status === "โสด" ? "โสด" : "มีคู่"
  );
  const [name, setName] = useState<string>();

  const handleDateConfirm = (event: any, selectedDate?: Date) => {
    if (selectedDate) setDateOfBirth(selectedDate);
  };

  const handleTimeConfirm = (event: any, selectedTime?: Date) => {
    if (selectedTime) setTimeOfBirth(selectedTime);
  };

  const handleSave = async () => {
    try {
      console.log(name);
      console.log(new Date(dateOfBirth));
      console.log(new Date(timeOfBirth));
      console.log(sex);
      console.log(status);

      await axios.put(
        `${API_URL}/user/${user?.id}`,
        {
          name: name,
          dateOfBirth: new Date(dateOfBirth),
          timeOfBirth: unknownTime ? null : new Date(timeOfBirth),
          sex: sex,
          status: status,
        },
        { withCredentials: true }
      );
      alert("บันทึกข้อมูลเรียบร้อยแล้ว");
      router.push("/(tabs)/home");
    } catch (err) {
      console.error("Error saving profile:", err);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setShowDatePicker(false);
        setShowTimePicker(false);
        Keyboard.dismiss();
      }}
    >
      <View className="flex flex-col gap-4 mt-12">
        {/* ชื่อ */}
        <View className="p-2">
          <Text className="font-PromptMedium text-2xl ml-2 mb-4">ชื่อ</Text>
          <TextInput
            value={name}
            onChangeText={() => setName(name)}
            className="border-4 border-secondary pt-5 pb-3 px-5 rounded-xl text-2xl font-PromptMedium"
            placeholder={"ชื่อ-นามสกุล"}
          />
        </View>

        {/* วัน/เดือน/ปีเกิด */}
        <View className="p-2">
          <Text className="font-PromptMedium text-2xl ml-2 mb-4">
            วัน/เดือน/ปีเกิด
          </Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            activeOpacity={0.7}
          >
            <View className="border-4 border-secondary pt-5 pb-3 px-5 rounded-xl">
              <Text className="text-2xl font-PromptMedium">
                {dateOfBirth.toLocaleDateString("th-TH", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </Text>
            </View>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={dateOfBirth}
              mode="date"
              display="spinner"
              onChange={handleDateConfirm}
            />
          )}
        </View>

        {/* เวลาเกิด + เช็คบ็อกซ์ */}
        <View className="p-2">
          <View className="flex flex-row items-center justify-between">
            <Text className="font-PromptMedium text-2xl ml-2 mb-4">
              เวลาเกิด
            </Text>
          </View>

          {!unknownTime && (
            <TouchableOpacity
              onPress={() => setShowTimePicker(true)}
              activeOpacity={0.7}
            >
              <View className="border-4 border-secondary pt-5 pb-3 px-5 rounded-xl">
                <Text className="text-2xl font-PromptMedium">
                  {timeOfBirth.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
            </TouchableOpacity>
          )}

          {showTimePicker && !unknownTime && (
            <DateTimePicker
              value={timeOfBirth}
              mode="time"
              display="spinner"
              onChange={handleTimeConfirm}
            />
          )}

          <View className="flex flex-row items-center gap-2 mt-3">
            <View className="rounded-full border-2 border-secondary">
              <Checkbox
                status={unknownTime ? "checked" : "unchecked"}
                onPress={() => setUnknownTime(!unknownTime)}
              />
            </View>
            <Text className="text-xl font-PromptMedium">ไม่ทราบเวลาเกิด</Text>
          </View>
        </View>

        {/* เพศ */}
        <View className="p-2">
          <Text className="font-PromptMedium text-2xl ml-2 mb-4">เพศ</Text>
          <View className="flex flex-row items-center gap-4">
            <View className="flex flex-row items-center gap-2">
              <View className="rounded-full border-2 border-secondary">
                <Checkbox
                  status={sex === "ชาย" ? "checked" : "unchecked"}
                  onPress={() => setSex("ชาย")}
                />
              </View>
              <Text className="text-2xl font-PromptMedium">ชาย</Text>
            </View>
            <View className="flex flex-row items-center gap-2 ">
              <View className="rounded-full border-2 border-secondary">
                <Checkbox
                  status={sex === "หญิง" ? "checked" : "unchecked"}
                  onPress={() => setSex("หญิง")}
                />
              </View>
              <Text className="text-2xl font-PromptMedium">หญิง</Text>
            </View>
          </View>
        </View>
        {/* สถานะ */}
        <View className="p-2">
          <Text className="font-PromptMedium text-2xl ml-2 mb-4">
            สถานะความสัมพันธ์
          </Text>
          <View className="flex flex-row items-center gap-4">
            <View className="flex flex-row items-center gap-2">
              <View className="rounded-full border-2 border-secondary">
                <Checkbox
                  status={status === "โสด" ? "checked" : "unchecked"}
                  onPress={() => setStatus("โสด")}
                />
              </View>
              <Text className="text-2xl font-PromptMedium">โสด</Text>
            </View>
            <View className="flex flex-row items-center gap-2 ">
              <View className="rounded-full border-2 border-secondary">
                <Checkbox
                  status={status === "มีคู่" ? "checked" : "unchecked"}
                  onPress={() => setStatus("มีคู่")}
                />
              </View>
              <Text className="text-2xl font-PromptMedium">มีคู่</Text>
            </View>
          </View>
        </View>
        <View className="w-[90%] mx-auto mt-5 ">
          <TouchableOpacity
            onPress={handleSave}
            className="bg-secondary rounded-xl py-4 mt-6"
          >
            <Text className="text-center text-white text-2xl font-PromptMedium">
              บันทึกข้อมูล
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditProfileForm;
