import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
// import {getCartSummary}
import { getCartSummary } from "../util/cart";

function Header({ name, cart }) {
  const restaurantName = "Addis Café";
  const { quantity } = getCartSummary(cart);

  return (
    <header>
      <Link to={"/"}>
        <h1>☕{restaurantName}</h1>
      </Link>
      <h2>{name != "" && `Hi ${name}!`} Have Fresh Ethiopian Food & Coffees</h2>
      <div className="cart-icon-container">
        <Link to={"/cart"}>
          <FaShoppingCart className="cart-icon" size={24} color="#333" />
          {quantity == 0 ? (
            <></>
          ) : (
            <div className="cart-item-counter">
              <p>{quantity}</p>
            </div>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;
