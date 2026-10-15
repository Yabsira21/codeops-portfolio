import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  name: string;
  isLoggedIn: boolean;
  login: (name: string) => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      name: "",
      isLoggedIn: false,
      login: (name) => set({ name, isLoggedIn: true }),
    }),
    { name: "auth-storage" },
  ),
);
