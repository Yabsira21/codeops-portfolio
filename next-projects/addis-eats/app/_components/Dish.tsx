"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { useCart } from "../_store/cart";
import DishModal from "./DishModal";

export default function Dish({
  id,
  name,
  price,
  spicy,
}: {
  id: number;
  name: string;
  price: number;
  spicy: boolean;
}) {
  const items = useCart((s) => s.items);
  const addItem = useCart((s) => s.addItem);
  const addQty = useCart((s) => s.addQty);

  const [showModal, setShowModal] = useState(false);
  const viewButtonRef = useRef<HTMLButtonElement>(null);

  function handleAdd() {
    const existingItem = items.find((cartItem) => cartItem.item.id === id);

    if (existingItem) {
      addQty(id);
    } else {
      addItem({ item: { id, name, price, spicy }, qty: 1 });
    }
  }

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    viewButtonRef.current?.focus();
  }, []);

  return (
    <div className="dish">
      <Link href={`/menu/${id}`}>
        <h3>{name}</h3>
      </Link>

      <p>{price} ETB</p>

      <div className={spicy ? "spicy" : ""}>{spicy ? "Spicy" : ""}</div>

      <button onClick={handleAdd}>Add</button>

      <button ref={viewButtonRef} onClick={() => setShowModal(true)}>
        View details
      </button>

      {showModal && (
        <DishModal
          dish={{ id, name, price, spicy }}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
