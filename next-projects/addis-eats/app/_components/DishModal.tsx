"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { CartItem } from "../_lib/types";

export default function DishModal({
  dish,
  onClose,
}: {
  dish: CartItem["item"];
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return createPortal(
    <div className="modal-backdrop">
      <div className="modal">
        <button ref={closeButtonRef} onClick={onClose}>
          Close
        </button>

        <h2>{dish.name}</h2>
        <p>Price: {dish.price} ETB</p>
        <p>{dish.spicy ? "Spicy 🌶️" : "Not spicy"}</p>
      </div>
    </div>,
    document.body,
  );
}
