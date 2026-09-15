import { create } from "zustand";
export const useCart = create((set) => ({
  items: [],
  addItem: (dish) => set((state) => ({ items: [...state.items, dish] })),
  addQty: (name) =>
    set((state) => ({
      items: state.items.map((cartItem) =>
        cartItem.item.name === name
          ? { ...cartItem, qty: cartItem.qty + 1 }
          : cartItem,
      ),
    })),
  remove: (name) =>
    set((state) => ({
      items: state.items.filter((d) => d.item.name !== name),
    })),
  clear: () => set({ items: [] }),
}));
