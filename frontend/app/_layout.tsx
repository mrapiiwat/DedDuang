import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { AuthProvider } from "@/hooks/useAuth";
import "./global.css";

export default function RootLayout() {
  useFonts({
    Anakotmai: require("../assets/fonts/Anakotmai-Light.ttf"),
    "Anakotmai-Medium": require("../assets/fonts/Anakotmai-Medium.ttf"),
    "Anakotmai-Bold": require("../assets/fonts/Anakotmai-Bold.ttf"),
  });

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen
          name="(tabs)"
          options={{ animation: "fade", gestureEnabled: false }}
        />
      </Stack>
    </AuthProvider>
  );
}
