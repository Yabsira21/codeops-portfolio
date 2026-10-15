import type { CartItem } from "./types";

export function getCartSummary(cart: CartItem[]) {
  return cart.reduce(
    (summary, cartItem) => {
      summary.quantity += cartItem.qty;
      summary.total += cartItem.item.price * cartItem.qty;
      return summary;
    },
    { quantity: 0, total: 0 },
  );
}
