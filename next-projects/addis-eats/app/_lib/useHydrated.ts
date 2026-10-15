import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// false on the server and during hydration, true afterwards.
// Needed because the cart/auth stores read localStorage, which the server can't see.
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
