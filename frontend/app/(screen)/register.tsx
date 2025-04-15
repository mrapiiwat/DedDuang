import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Checkbox } from "react-native-paper";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [sex, setSex] = useState<string>();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateConfirm = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDateOfBirth(selectedDate);
      setIsDateSelected(true);
      setShowDatePicker(false);
    }
  };

  const handleConfirm = () => {
    if (!email || !password || !sex || !isDateSelected) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    Alert.alert(
      "Registration Successful",
      "You have successfully registered! \n" +
        email +
        "\n" +
        password +
        "\n" +
        dateOfBirth
    );
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setShowDatePicker(false);
      }}
    >
      <View className="flex-1 items-center justify-center relative w-full">
        <Image
          source={require("@/assets/images/regisbg.png")}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute top-14 left-6 z-30">
          <TouchableOpacity
            onPress={() => router.push("/(screen)/login")}
            className="flex-row items-center"
          >
            <AntDesign name="arrowleft" size={40} color="white" />
            <Text className="font-bold text-2xl text-white font-Prompt ml-3">
              ย้อนกลับ
            </Text>
          </TouchableOpacity>
        </View>

        <View className="absolute top-96 w-full items-center justify-center gap-10 px-10">
          <TextInput
            value={email}
            onChangeText={setEmail}
            className="bg-white w-full h-20 border-2 border-[#D2B589] rounded-2xl p-5 text-3xl font-Prompt"
            placeholder="กรุณากรอกอีเมล"
            keyboardType="email-address"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            className="bg-white w-full h-20 border-2 border-[#D2B589] rounded-2xl p-5 text-3xl font-Prompt"
            placeholder="กรุณากรอกรหัสผ่าน"
            secureTextEntry
          />

          {/* วันเกิด */}
          <View className="p-2 w-full">
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              activeOpacity={0.7}
            >
              <View className="bg-white w-full h-20 border-2 border-[#D2B589] rounded-2xl p-5 justify-center font-Prompt">
                <Text
                  className={`text-3xl font-PromptMedium ${
                    isDateSelected ? "text-black" : "text-gray-400"
                  }`}
                >
                  {isDateSelected
                    ? dateOfBirth.toLocaleDateString("th-TH", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                    : "กรุณาเลือกวันเกิด"}
                </Text>
              </View>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={dateOfBirth}
                mode="date"
                display="spinner"
                textColor="white"
                onChange={handleDateConfirm}
              />
            )}
          </View>

          <View className="w-full flex-row items-center justify-start gap-6">
            <View className="flex-row items-center gap-2">
              <View className="rounded-full border-2 border-secondary">
                <Checkbox
                  status={sex === "ชาย" ? "checked" : "unchecked"}
                  onPress={() => setSex("ชาย")}
                  color="#D2B589"
                  uncheckedColor="#D2B589"
                />
              </View>
              <Text className="text-2xl font-PromptMedium text-white">ชาย</Text>
            </View>

            <View className="flex-row items-center gap-2">
              <View className="rounded-full border-2 border-secondary">
                <Checkbox
                  status={sex === "หญิง" ? "checked" : "unchecked"}
                  onPress={() => setSex("หญิง")}
                  color="#D2B589"
                  uncheckedColor="#D2B589"
                />
              </View>
              <Text className="text-2xl font-PromptMedium text-white">
                หญิง
              </Text>
            </View>
          </View>

          <View className="mt-3 items-center gap-4">
            <TouchableOpacity
              onPress={handleConfirm}
              className="bg-[#D2B589] px-14 py-4 rounded-full items-center justify-center"
            >
              <Text className="text-3xl text-white font-Prompt">
                สมัครสมาชิก
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mt-4"
              onPress={() => router.push("/(screen)/login")}
            >
              <Text className="text-white underline font-Prompt text-xl">
                เป็นสมาชิกอยู่เเล้ว?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;
