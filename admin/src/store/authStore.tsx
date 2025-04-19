import axios from "axios";
import { create, StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { BASE_URL, LOGIN, LOGOUT } from "../api/endpoint.api";

interface userSchema {
  id: string;
  email: string;
  name: string;
  role: string;
}
interface formLogin {
  email: string;
  password: string;
}

interface AuthStore {
  user: userSchema | null;
  actionLogin: (form: formLogin) => void;
  actionLogout: () => void;
}

const authStore: StateCreator<AuthStore> = (set) => ({
  user: null,
  actionLogin: async (form: formLogin) => {
    const res = await axios.post(`${BASE_URL}${LOGIN}`, form, {
      withCredentials: true,
    });
    set({
      user: res.data.user,
    });

    return res;
  },
  actionLogout: async () => {
    const res = await axios.get(`${BASE_URL}${LOGOUT}`);
    set({
      user: null,
    });
    useAuthStore.persist.clearStorage();
    return res;
  },
});

const usePersist = {
  name: "auth",
  getStorage: () => createJSONStorage(() => localStorage),
};

const useAuthStore = create(persist(authStore, usePersist));

export default useAuthStore;
