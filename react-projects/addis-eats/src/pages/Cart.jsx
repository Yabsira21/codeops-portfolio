import { Link } from "react-router-dom";
import { getCartSummary } from "../util/cart";
import { useNavigate } from "react-router-dom";
import { useCart } from "../store/store";

function Cart({ isLoggedIn }) {
  const navigate = useNavigate();
  const items = useCart((s) => s.items);
  const { total } = getCartSummary(items);

  if (items.length == 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="cart">
      <p>Total: {total} ETB</p>
      {items.map((cartItem) => (
        <div className="cart-item" key={cartItem.item.id}>
          <h3>{cartItem.item.name}</h3>
          <p>{cartItem.item.price} ETB</p>
          <p>Quantity: {cartItem.qty}</p>
          <p>Subtotal: {cartItem.item.price * cartItem.qty} ETB</p>
        </div>
      ))}
      <button onClick={() => navigate("/form")}>Checkout</button>
    </div>
  );
}

export default Cart;
