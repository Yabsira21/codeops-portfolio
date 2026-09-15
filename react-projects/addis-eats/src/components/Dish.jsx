import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../store/cart";

function Dish({ id, name, price, spicy }) {
  const items = useCart((s) => s.items);
  const addItem = useCart((s) => s.addItem);
  const addQty = useCart((s) => s.addQty);

  function handleAdd() {
    // const existingItem = cart.find((cartItem) => cartItem.item.name === name);
    const existingItem = items.find((cartItem) => cartItem.item.name === name);

    if (existingItem) {
      // setCart(
      //   cart.map((cartItem) =>
      //     cartItem.item.name === name
      //       ? { ...cartItem, qty: cartItem.qty + 1 }
      //       : cartItem,
      //   ),
      // );
      addQty(name);
    } else {
      // setCart([
      //   ...cart,
      //   {
      //     item: { name, price, spicy },
      //     qty: 1,
      //   },
      // ]);
      addItem({
        item: { name, price, spicy },
        qty: 1,
      });
    }
  }

  return (
    <div className="dish">
      <Link to={`/menu/${id}`}>
        <h3>{name}</h3>
      </Link>
      <p>{price} ETB</p>
      <div className={spicy ? "spicy" : ""}>{spicy ? "Spicy" : ""}</div>
      {/* <p>Count: {count}</p> */}
      <button
        onClick={() => {
          handleAdd();
          // console.log(cart);
          // setCount(count + 1);
          // setTotal(total + price);
        }}
      >
        Add
      </button>
    </div>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool, // optional
};

export default Dish;
