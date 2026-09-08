export function getCartSummary(cart) {
  return cart.reduce(
    (summary, cartItem) => {
      summary.quantity += cartItem.qty;
      summary.total += cartItem.item.price * cartItem.qty;

      return summary;
    },
    { quantity: 0, total: 0 },
  );
}
