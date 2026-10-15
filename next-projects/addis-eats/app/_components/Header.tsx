"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { getCartSummary } from "../_lib/cart";
import { useHydrated } from "../_lib/useHydrated";
import { useAuth } from "../_store/auth";
import { useCart } from "../_store/cart";

export default function Header() {
  const restaurantName = "Addis Café";
  const router = useRouter();
  const pathname = usePathname();
  const hydrated = useHydrated();

  const name = useAuth((s) => s.name);
  const loggedIn = useAuth((s) => s.isLoggedIn);
  const items = useCart((s) => s.items);

  // Persisted state is only readable in the browser, so wait for hydration.
  const userName = hydrated ? name : "";
  const isLoggedIn = hydrated && loggedIn;
  const quantity = hydrated ? getCartSummary(items).quantity : 0;

  // Login page has no header (same as the React app)
  if (pathname === "/login") return null;

  return (
    <header>
      <Link href="/menu">
        <h1>☕{restaurantName}</h1>
      </Link>
      <h2>
        {userName !== "" && `Hi ${userName}! `}Have Fresh Ethiopian Food &
        Coffees
      </h2>

      <div className="cart-icon-container">
        <Link href="/cart">
          <FaShoppingCart className="cart-icon" size={24} color="#333" />
          {quantity > 0 && (
            <div className="cart-item-counter">
              <p>{quantity}</p>
            </div>
          )}
        </Link>
      </div>

      {isLoggedIn ? (
        <FaUser className="auth-button" />
      ) : (
        <button onClick={() => router.push("/login")} className="auth-button">
          Sign in
        </button>
      )}
    </header>
  );
}
