import PropTypes from "prop-types";
import { useState } from "react";

function Dish({ name, price, spicy, setTotal, total }) {
  const [count, setCount] = useState(0);
  // console.log(name, price);
  return (
    <div className="dish">
      <h3>{name}</h3>
      <p>{price} ETB</p>
      <div className={spicy ? "spicy" : ""}>{spicy ? "Spicy" : ""}</div>
      <p>Count: {count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
          setTotal(total + price);
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
