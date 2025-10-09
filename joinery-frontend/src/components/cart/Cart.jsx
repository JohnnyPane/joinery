import { Link, useLocation } from "react-router-dom";
import { Divider, Button } from '@mantine/core';

import { useCart } from '../../hooks/useCart.js';
import { moneyDisplay } from "../../utils/humanizeText.js";
import CartSummary from "./CartSummary.jsx";
import CartItem from './CartItem.jsx';

const Cart = ({ closeModal }) => {
  const { cart, isLoading, isError, error } = useCart();
  const location = useLocation();

  if (!cart) return null;

  const cartHasItems = cart.cart_items && cart.cart_items.length > 0;
  const isCheckoutPage = location.pathname.includes('checkout');

  const handleGoToCheckout = () => {
    closeModal();
  }

  return (
    <div>
      {cartHasItems ? (
          <>
            <div className="double-margin-bottom">
              {cart.cart_items.map(item => (
                <div key={item.data.id}>
                  <CartItem cartItem={item} onItemClick={closeModal} />
                  <Divider my="sm" />
                </div>
              ))}
            </div>

            {isCheckoutPage ? <CartSummary /> : (
              <div className="flex column double-margin-top align-center">
                <span className="label-small margin-bottom">
                  Shipping & taxes calculated at checkout
                </span>
                <Button
                  component={Link}
                  to="/checkout/shipping_options"
                  onClick={handleGoToCheckout}
                  radius={0}
                  className="full-width"
                >
                  <span className="margin-right">Go to Checkout</span>
                  <span className="margin-right margin-left">|</span>
                  <span className="margin-left">
                {moneyDisplay(cart.total_price_in_cents)}
              </span>
                </Button>
              </div>
            )}
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
    </div>
  );
}

export default Cart;