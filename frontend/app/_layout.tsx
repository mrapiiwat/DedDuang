import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { AuthProvider } from "@/hooks/useAuth";
import "./global.css";

export default function RootLayout() {
  useFonts({
    Prompt: require("../assets/fonts/Anakotmai-Light.ttf"),
    "Prompt-Medium": require("../assets/fonts/Prompt-Medium.ttf"),
    "Prompt-Bold": require("../assets/fonts/Prompt-Bold.ttf"),
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
