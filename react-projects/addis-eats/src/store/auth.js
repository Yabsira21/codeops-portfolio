import { create } from "zustand";

export const useAuth = create((set) => ({
  name: "",
  isLoggedIn: false,

  login: (name) =>
    set({
      name: name,
      isLoggedIn: true,
    }),
}));
