import {
  View,
  Text,
  RefreshControl,
  SafeAreaView,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import NewsCard from "../components/NewsCard";
import Constants from "expo-constants";
import axios from "axios";

const API_URL = Constants.expoConfig?.extra?.API_URL;
const PAGE_SIZE = 10;

const index: React.FC = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  interface NewsItem {
    title: string;
    url: string;
    imageUrl: string;
  }

  const fetchNews = async (reset = false) => {
    if (loading || (!hasMore && !reset)) return;
    setLoading(true);

    try {
      if (!API_URL) throw new Error("API_URL is not defined");

      const newPage = reset ? 1 : page;
      const res = await axios.get(
        `${API_URL}/news?page=${newPage}&limit=${PAGE_SIZE}`
      );

      if (reset) {
        setNews(res.data);
      } else {
        setNews((prev) => [...prev, ...res.data]);
      }

      setHasMore(res.data.length === PAGE_SIZE);
      setPage(reset ? 2 : newPage + 1);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNews(true);
    setRefreshing(false);
  };

  const month: string[] = [
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

  return (
    <View className="flex-1 relative w-full bg-mybg">
      <Image
        source={require("../../assets/images/Shadow-Barrier-Top.png")}
        className="w-full h-[63] absolute top-0 z-10"
        resizeMode="cover"
      />
      <SafeAreaView>
        <View className="px-6 mb-20">
          <Text className="z-20 font-bold text-[30px] mb-6 mt-5 font-Anakotmai">
            {`วันที่ ${new Date().getDate()} ${month[new Date().getMonth()]} ${
              new Date().getFullYear() + 543
            }`}
          </Text>

          {loading && news.length === 0 ? (
            <View className="flex items-center justify-center h-40">
              <ActivityIndicator size="large" color="#0000ff" />
              <Text className="mt-2 text-gray-500 font-Anakotmai">
                Loading...
              </Text>
            </View>
          ) : (
            <FlatList
              className="h-full"
              data={news}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                // <View className="mb-4">
                //     <Text className="text-2xl font-bold font-Anakotmai text-gray-800" numberOfLines={2} ellipsizeMode="tail">
                //       {item.title}
                //     </Text>
                <NewsCard
                  key={item.url}
                  linkUrl={item.url}
                  picUrl={item.imageUrl}
                />
                // </View>
              )}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 170 }}
              showsVerticalScrollIndicator={false}
              onEndReached={() => fetchNews()}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                loading && news.length > 0 ? (
                  <View className="flex items-center justify-center py-4">
                    <ActivityIndicator size="small" color="#0000ff" />
                    <Text className="mt-2 text-gray-500 font-Anakotmai">
                      Loading more...
                    </Text>
                  </View>
                ) : null
              }
            />
          )}
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
