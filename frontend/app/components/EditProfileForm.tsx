import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Switch,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Checkbox } from "react-native-paper";

interface Data {
  profileImage: string;
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  sex: string;
  status: string;
}

const EditProfileForm: React.FC<{ data: Data }> = ({ data }) => {
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [timeOfBirth, setTimeOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [unknownTime, setUnknownTime] = useState(false);
  const [sex, setSex] = useState<string>();
  const [status, setStatus] = useState<string>();

  const handleDateConfirm = (event: any, selectedDate?: Date) => {
    if (selectedDate) setDateOfBirth(selectedDate);
    setShowDatePicker(false);
  };

  const handleTimeConfirm = (event: any, selectedTime?: Date) => {
    if (selectedTime) setTimeOfBirth(selectedTime);
    setShowTimePicker(false);
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
          <Text className="font-AnakotmaiMedium text-2xl ml-2 mb-4">ชื่อ</Text>
          <TextInput
            className="border-4 border-secondary pt-5 pb-3 px-5 rounded-xl text-2xl font-AnakotmaiMedium"
            placeholder={data.name}
          />
        </View>

        {/* วัน/เดือน/ปีเกิด */}
        <View className="p-2">
          <Text className="font-AnakotmaiMedium text-2xl ml-2 mb-4">
            วัน/เดือน/ปีเกิด
          </Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            activeOpacity={0.7}
          >
            <View className="border-4 border-secondary pt-5 pb-3 px-5 rounded-xl">
              <Text className="text-2xl font-AnakotmaiMedium">
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
            <Text className="font-AnakotmaiMedium text-2xl ml-2 mb-4">
              เวลาเกิด
            </Text>
          </View>

          {!unknownTime && (
            <TouchableOpacity
              onPress={() => setShowTimePicker(true)}
              activeOpacity={0.7}
            >
              <View className="border-4 border-secondary pt-5 pb-3 px-5 rounded-xl">
                <Text className="text-2xl font-AnakotmaiMedium">
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
            <Text className="text-xl font-AnakotmaiMedium">
              ไม่ทราบเวลาเกิด
            </Text>
          </View>
        </View>

        {/* เพศ */}
        <View className="p-2">
          <Text className="font-AnakotmaiMedium text-2xl ml-2 mb-4">เพศ</Text>
          <View className="flex flex-row items-center gap-4">
            <View className="flex flex-row items-center gap-2">
              <View className="rounded-full border-2 border-secondary">
                <Checkbox
                  status={sex === "ชาย" ? "checked" : "unchecked"}
                  onPress={() => setSex("ชาย")}
                />
              </View>
              <Text className="text-2xl font-AnakotmaiMedium">ชาย</Text>
            </View>
            <View className="flex flex-row items-center gap-2 ">
              <View className="rounded-full border-2 border-secondary">
                <Checkbox
                  status={sex === "หญิง" ? "checked" : "unchecked"}
                  onPress={() => setSex("หญิง")}
                />
              </View>
              <Text className="text-2xl font-AnakotmaiMedium">หญิง</Text>
            </View>
          </View>
        </View>
        {/* สถานะ */}
        <View className="p-2">
          <Text className="font-AnakotmaiMedium text-2xl ml-2 mb-4">
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
              <Text className="text-2xl font-AnakotmaiMedium">โสด</Text>
            </View>
            <View className="flex flex-row items-center gap-2 ">
              <View className="rounded-full border-2 border-secondary">
                <Checkbox
                  status={status === "มีคู่" ? "checked" : "unchecked"}
                  onPress={() => setStatus("มีคู่")}
                />
              </View>
              <Text className="text-2xl font-AnakotmaiMedium">มีคู่</Text>
            </View>
          </View>
        </View>
        <View className="w-[90%] mx-auto mt-5 ">
          <TouchableOpacity className="bg-secondary rounded-xl py-4 mt-6">
            <Text className="text-center text-white text-2xl font-AnakotmaiMedium">
              บันทึกข้อมูล
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditProfileForm;
