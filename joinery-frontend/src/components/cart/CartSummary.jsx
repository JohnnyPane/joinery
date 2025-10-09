import { useCart } from "../../hooks/useCart.js";
import { moneyDisplay } from "../../utils/humanizeText.js";


const CartSummary = () => {
  const { cart } = useCart();

  if (!cart || cart.cart_items.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="cart-summary">
      {/*<h3>Cart Summary</h3>*/}
      <ul>
        {/*{cart.cart_items.map(item => (*/}
        {/*  <li key={item.id}>*/}
        {/*    {item.product.name} - {moneyDisplay(item.product.price_in_cents)} x {item.quantity}*/}
        {/*  </li>*/}
        {/*))}*/}
      </ul>
      <h4>Total: {moneyDisplay(cart.total_price_in_cents)}</h4>
    </div>
  );
}

export default CartSummary;
