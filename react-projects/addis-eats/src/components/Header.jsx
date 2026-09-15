import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
// import {getCartSummary}
import { useNavigate } from "react-router-dom";
import { getCartSummary } from "../util/cart";
import { useCart } from "../store/cart";
import { useAuth } from "../store/auth";

function Header() {
  const restaurantName = "Addis Café";
  const userName = useAuth((s) => s.name);
  const isLoggedin = useAuth((s) => s.isLoggedIn);
  const items = useCart((s) => s.items);
  const { quantity } = getCartSummary(items);
  const navigate = useNavigate();

  return (
    <header>
      <Link to={"/"}>
        <h1>☕{restaurantName}</h1>
      </Link>
      <h2>
        {userName != "" && `Hi ${userName}!`} Have Fresh Ethiopian Food &
        Coffees
      </h2>
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
      {isLoggedin ? (
        <FaUser className="auth-button" />
      ) : (
        <button onClick={() => navigate("/login")} className="auth-button">
          Sign in
        </button>
      )}
    </header>
  );
}

export default Header;
