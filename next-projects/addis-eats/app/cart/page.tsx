"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCartSummary } from "../_lib/cart";
import { useHydrated } from "../_lib/useHydrated";
import { useCart } from "../_store/cart";

export default function Cart() {
  const router = useRouter();
  const hydrated = useHydrated();
  const items = useCart((s) => s.items);
  const removeItem = useCart((s) => s.remove);
  const { total } = getCartSummary(items);

  if (!hydrated) return <p className="mt-2">Loading cart...</p>;

  if (items.length === 0) {
    return (
      <p className="mt-2">
        Your cart is empty. <Link href="/menu">Browse the menu</Link>
      </p>
    );
  }

  return (
    <div className="cart">
      <p>Total: {total} ETB</p>

      {items.map((cartItem) => (
        <div className="cart-item" key={cartItem.item.id}>
          <h3>{cartItem.item.name}</h3>
          <p>{cartItem.item.price} ETB</p>
          <p>Quantity: {cartItem.qty}</p>
          <p>Subtotal: {cartItem.item.price * cartItem.qty} ETB</p>
          <button onClick={() => removeItem(cartItem.item.id)}>delete</button>
        </div>
      ))}

      <button onClick={() => router.push("/checkout")}>Checkout</button>
    </div>
  );
}
