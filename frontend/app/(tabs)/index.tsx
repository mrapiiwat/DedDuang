import {
  View,
  Text,
  RefreshControl,
  SafeAreaView,
  Image,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import NewsCard from "../components/NewsCard";
import Constants from "expo-constants";
import axios from "axios";

const API_URL = Constants.expoConfig?.extra?.API_URL;

interface NewsItem {
  url: string;
  imageUrl: string;
}

const index: React.FC = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [news, setNews] = useState<NewsItem[]>([]);

  const fetchNews = async () => {
    try {
      if (!API_URL) throw new Error("API_URL is not defined");

      const res = await axios.get(`${API_URL}/news`);
      setNews(res.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const month = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNews();
    setRefreshing(false);
  };

  return (
    <View className="flex-1 relative w-full bg-mybg">
      <Image
        source={require("../../assets/images/Shadow-Barrier-Top.png")}
        className="w-full h-[63] absolute top-0 z-10"
        resizeMode="cover"
      />
      <SafeAreaView>
        <View className="px-6 mb-20">
          <Text className="z-20 font-bold text-[35px] mb-6 mt-5">
            {`วันที่ ${new Date().getDate()} เดือน ${
              month[new Date().getMonth()]
            }`}
          </Text>
          <FlatList
            className="h-full"
            data={news}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <NewsCard
                key={item.url}
                linkUrl={item.url}
                picUrl={item.imageUrl}
              />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 170 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
      <Image
        source={require("../../assets/images/Shadow-Barrier-Bottom.png")}
        className="w-full h-[120] absolute bottom-0 z-10"
        resizeMode="cover"
      />
    </View>
  );
};

export default index;
