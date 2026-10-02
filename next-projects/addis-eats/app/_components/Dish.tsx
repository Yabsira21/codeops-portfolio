// import { useRef, useState } from "react";

import Link from "next/link";

// import { Link } from "react-router-dom";

// import { useCart } from "../store/cart";
// import DishModal from "./DishModal";

function Dish({
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
  //   const items = useCart((s: any) => s.items);
  //   const addItem = useCart((s) => s.addItem);
  //   const addQty = useCart((s) => s.addQty);

  //   const [showModal, setShowModal] = useState(false);

  //   const viewButtonRef = useRef(null);

  //   function handleAdd() {
  //     const existingItem = items.find((cartItem) => cartItem.item.name === name);

  //     if (existingItem) {
  //       addQty(name);
  //     } else {
  //       addItem({
  //         item: {
  //           id,
  //           name,
  //           price,
  //           spicy,
  //         },
  //         qty: 1,
  //       });
  //     }
  //   }

  //   function handleCloseModal() {
  //     setShowModal(false);
  //     viewButtonRef.current?.focus();
  //   }

  return (
    <div className="dish">
      <Link href={`/menu/${id}`}>
        <h3>{name}</h3>
      </Link>

      <p>{price} ETB</p>

      <div className={spicy ? "spicy" : ""}>{spicy ? "Spicy" : ""}</div>

      <button>Add</button>

      {/* <button ref={viewButtonRef} onClick={() => setShowModal(true)}>
        View details
      </button> */}

      {/* {showModal && (
        <DishModal
          dish={{ id, name, price, spicy }}
          onClose={handleCloseModal}
        />
      )} */}
    </div>
  );
}

export default Dish;
