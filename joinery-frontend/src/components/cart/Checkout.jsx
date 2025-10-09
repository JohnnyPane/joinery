import { Grid, Fieldset, Text } from "@mantine/core";

import CheckoutDetails from "./CheckoutDetails.jsx";
import Cart from "./Cart.jsx";

const Checkout = () => {
  return (
    <div>

      <Grid>
        <Grid.Col span={6} md={6}>
          <Fieldset legend="Shipping & Billing" className="margin-bottom">
            <h2 className="margin">Checkout</h2>
            <CheckoutDetails />
          </Fieldset>
        </Grid.Col>

        <Grid.Col span={6} md={6}>
          <Fieldset legend="Cart" className="margin-bottom">
            <Cart />
          </Fieldset>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default Checkout;
