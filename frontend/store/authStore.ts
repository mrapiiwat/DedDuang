import { create } from "zustand";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;

interface User {
  id: String;
  email: String;
  name: String;
  dateOfBirth: Date;
  timeOfBirth: String;
  image: String;
  sex: String;
  status: String;
}

interface AuthStore {
  user: User | null;
  token: String | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearToken: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  clearToken: async () => {
    set({ token: null });
    await AsyncStorage.removeItem("token");
  },
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${API_URL}/login`,
        { email, password },
        { withCredentials: true }
      );

      console.log("Login response:", response.data);

      const { user, token } = response.data;

      set({ user, token, isAuthenticated: true });
      await AsyncStorage.setItem("user", JSON.stringify(user));
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      console.error("Login error:", error);

      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "เข้าสู่ระบบล้มเหลว โปรดลองอีกครั้ง";
        throw new Error(message);
      } else {
        throw new Error("เกิดข้อผิดพลาดที่ไม่คาดคิด");
      }
    }
  },
  logout: async () => {
    try {
      await axios.get(`${API_URL}/logout`);
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("token");
      set({ user: null, token: null, isAuthenticated: false });
    } catch (error) {
      console.error("Logout error:", error);
    }
  },
  checkAuth: async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      const storedToken = await AsyncStorage.getItem("token");
      if (storedUser && storedToken) {
        set({
          user: JSON.parse(storedUser),
          token: storedToken,
          isAuthenticated: true,
        });
      } else {
        set({ user: null, token: null, isAuthenticated: false });
      }
    } catch (error) {
      console.error("Error Checking auth status:", error);
    }
  },
  refreshUser: async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const response = await axios.get(`${API_URL}/user/${parsedUser.id}`);
        set({ user: response.data });
      }
    } catch (error) {
      console.error("Error refreshing user:", error);
    }
  },
}));
