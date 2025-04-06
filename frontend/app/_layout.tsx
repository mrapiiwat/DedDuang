import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import "./global.css";
import { useAuthStore } from "@/store/authStore";

export default function RootLayout() {
  
  const checkAuth = useAuthStore((state) => state.checkAuth);
  
  checkAuth();

  useFonts({
    Prompt: require("../assets/fonts/Prompt-Light.ttf"),
    "Prompt-Medium": require("../assets/fonts/Prompt-Medium.ttf"),
    "Prompt-Bold": require("../assets/fonts/Prompt-Bold.ttf"),
  });

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="(tabs)"
        options={{ animation: "fade", gestureEnabled: false }}
      />
    </Stack>
  );
}
