import { getCartSummary } from "../util/cart";

function Cart({ cart }) {
  const { total } = getCartSummary(cart);

  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="cart">
      <p>Total: {total} ETB</p>
      {cart.map((cartItem) => (
        <div className="cart-item" key={cartItem.item.id}>
          <h3>{cartItem.item.name}</h3>
          <p>{cartItem.item.price} ETB</p>
          <p>Quantity: {cartItem.qty}</p>
          <p>Subtotal: {cartItem.item.price * cartItem.qty} ETB</p>
        </div>
      ))}
    </div>
  );
}

export default Cart;
