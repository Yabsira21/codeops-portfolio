import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuth = create(
  persist(
    (set) => ({
      name: "",
      isLoggedIn: false,

      login: (name) =>
        set({
          name: name,
          isLoggedIn: true,
        }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
