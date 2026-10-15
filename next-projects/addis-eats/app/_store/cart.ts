import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "../_lib/types";

type CartState = {
  items: CartItem[];
  addItem: (dish: CartItem) => void;
  addQty: (id: number) => void;
  remove: (id: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (dish) => set((state) => ({ items: [...state.items, dish] })),

      addQty: (id) =>
        set((state) => ({
          items: state.items.map((cartItem) =>
            cartItem.item.id === id
              ? { ...cartItem, qty: cartItem.qty + 1 }
              : cartItem,
          ),
        })),

      remove: (id) =>
        set((state) => ({
          items: state.items.filter((d) => d.item.id !== id),
        })),

      clear: () => set({ items: [] }),
    }),
    { name: "cart-storage" },
  ),
);
