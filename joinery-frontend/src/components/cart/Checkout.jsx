import { Grid, Fieldset } from "@mantine/core";
import CheckoutDetails from "./CheckoutDetails.jsx";
import Cart from "./Cart.jsx";
import './Checkout.scss';

const Checkout = () => {
  return (
    <div className="page double-margin-top margin-bottom">
      <div className="checkout-container">
        <div className="shipping-fieldset">
          <Fieldset legend="Shipping & Billing">
            <h2 className="margin">Checkout</h2>
            <CheckoutDetails />
          </Fieldset>
        </div>

        <div className="cart-fieldset margin-bottom">
          <Fieldset legend="Cart">
            <Cart />
          </Fieldset>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
