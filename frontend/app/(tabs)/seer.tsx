import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import Constants from "expo-constants";
import { useAuthStore } from "../../store/authStore";
import { useRouter } from "expo-router";

const API_URL = `${Constants.expoConfig?.extra?.API_URL}`;

const Seer = () => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const ImgageUri = `${API_URL?.replace(/\/api$/, "")}/uploads/${user?.image}`;

  if (!user?.timeOfBirth || !user?.status || !user?.name) {
    alert("กรุณากรอกข้อมูลส่วนตัวให้ครบถ้วนก่อนใช้งาน");
    return router.push("/(screen)/editProfile");
  }

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "สวัดดี! ยินดีต้อนรับสู่โลกแห่งคำทำนาย พร้อมจะเปิดเผยชะตาชีวิตของคุณหรือยัง?" },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await axios.post(`${API_URL}/openai/chat`, {
        messages: input,
        data: JSON.stringify(user),
      });

      const reply = response.data || "ไม่มีข้อความตอบกลับ";
      const assistantMessage = { role: "assistant", content: reply };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Error sending message:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "เกิดข้อผิดพลาดในการตอบคำถาม 🥲" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const renderMessage = ({ item }: any) => {
    const isUser = item.role === "user";
    const isTypingBubble = item.typing;

    return (
      <View
        className={`flex-row ${
          isUser ? "flex-row-reverse" : ""
        } items-start my-2 px-4`}
      >
        {/* Avatar */}
        {isUser ? (
          <Image
            source={{uri: ImgageUri}}
            className="w-9 h-9 rounded-full mx-1.5 mt-1.5"
          />
        ) : (
          <Image
            source={{
              uri: "https://s3-alpha-sig.figma.com/img/e3e2/b38d/f06e86695c1ea32164c45eacdfeb8edd?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=R0FurmiJDLbi1jw2lkIpeQQZ7o44D7WpOXaBfPtL-Z86JdlDBwv2drhUoWxOgQF-gZnYXFIi3YXp181wLNthjRBD26UkkoHNtGfV-C0NSCHLXqDbNW5kC2TGUMOitLLcyZAgr1G4oU5E5jW7FFfrU9VYqOoOh5jC0bMyRYuu3Cs6uNSqPk0WxoVclLxnykd-f4kekoWge1nmnDKz6yJNwiYdeZa5SWI6aQZGnVYqBmPgBs4WjOfE4Rg-9nNEuWpHFCYD9m-aHX9ySDlQ12jpifLg29RjqYH3bfujdjf80YZAsJawuHmj08hvn0OD6FaafEX7inQyBHpH9bMQQZz1Aw__",
            }}
            className="w-9 h-9 rounded-full mx-1.5 mt-1.5"
          />
        )}

        {/* Message Bubble */}
        <View
          className={`rounded-lg p-3 max-w-[75%] ${
            isUser ? "bg-[#eae5dd]" : "bg-white border border-[#2E1F54]"
          }`}
        >
          {isTypingBubble ? (
            <ActivityIndicator size="small" color="#2E1F54" />
          ) : (
            <Text className="text-base font-Prompt">{item.content}</Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#E9E6E1] py-16 px-4"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <FlatList
        className="flex-1 bg-[#FEFFFF] rounded-3xl"
        data={
          isTyping
            ? [...messages, { typing: true, role: "assistant" }]
            : messages
        }
        keyExtractor={(_, i) => i.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={renderMessage}
        contentContainerStyle={{ paddingVertical: 40 }}
        inverted
      />

      {/* Input */}
      <View className="flex-row items-center mx-4 mb-32 p-2.5 rounded-full bg-white border border-[#D2B589] mt-3">
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="ลองถามอะไรสักอย่างสิ"
          className="flex-1 text-base pl-3 font-Prompt"
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity
          onPress={sendMessage}
          className="bg-[#D2B589] p-2.5 rounded-full ml-2"
        >
          <AntDesign name="arrowup" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Seer;
