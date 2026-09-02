import PropTypes from "prop-types";

function Dish({ name, price, spicy }) {
  console.log(name, price);
  return (
    <div className="dish">
      <h3>{name}</h3>
      <p>{price} ETB</p>
      <p>{spicy ? "Spicy" : "Not Spicy"}</p>
    </div>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool, // optional
};

export default Dish;
