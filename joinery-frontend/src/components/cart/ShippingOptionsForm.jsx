import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Radio, CheckIcon, Button, Text } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import { useForm } from '@mantine/form';

import { useCart } from '../../hooks/useCart.js';
import { useUpdateResources } from "../../hooks/useResourceMutations.js";
import CartItem from "./CartItem.jsx";
import './Cart.scss';
import ShippingInfoModal from "./ShippingInfoModal.jsx";
import { optionDisplayText } from "../../utils/shippingConfigs.js";


const ShippingOptionSelector = ({ item, form, index }) => {
  const shippingOptions = item.product.shipping_options || [];

  const hasQuoteOption = shippingOptions.some(option => option.shipping_type === 'quote');

  return (
    <div className="shipping-option-selector">
      <Radio.Group
        name={`cart_items.${index}.shipping_option_id`}
        {...form.getInputProps(`cart_items.${index}.shipping_option_id`)}
      >
        {shippingOptions.map(option => (
          <Radio
            key={option.id}
            value={String(option.id)}
            label={optionDisplayText(option.price_in_cents, option.shipping_type)}
            icon={CheckIcon}
            disabled={hasQuoteOption}
            className="margin-bottom clickable"
            color="teal"
          />
        ))}
      </Radio.Group>
    </div>
  );
}

const ShippingOptionsForm = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const { cart } = useCart();
  const updateCartItem = useUpdateResources('cart_items');

  const navigate = useNavigate();

  const cartItems = cart?.cart_items || [];

  const form = useForm({
    initialValues: {
      cart_items: cartItems.map(item => ({
        id: item.id,
        shipping_option_id: item.shipping_option_id || null,
      })),
    },
  });

  useEffect(() => {
    if (cartItems.length > 0) {
      form.setValues({
        cart_items: cartItems.map(item => ({
          id: item.id,
          shipping_option_id: String(item.shipping_option_id) || null,
        })),
      });
    }
  }, [cartItems]);

  if (!cart || cartItems.length === 0) {
    return <div className="margin-t-80 center-content">Your cart is empty.</div>;
  }

  const handleSubmit = async (values) => {
    const cartItemUpdates = values.cart_items
    await updateCartItem.mutate(cartItemUpdates);
    navigate('/checkout');
  }

  const allOptionsSelected = form.values.cart_items.every(item => item.shipping_option_id && item.shipping_option_id !== 'null');

  return (
    <div className="center-content double-margin-top">
      <Card shadow="sm" padding="lg" radius="md" withBorder className="shipping-options-form">
        <Text size="lg" className="bold margin-bottom">Shipping Options</Text>
        <Text size="sm" color="dimmed" mb="lg">
          Please select a shipping option for each item in your cart. To learn more about our shipping methods, <span className="link-like-text" onClick={open}>click here</span>.
        </Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {cartItems.map((item, index) => (
            <div key={item.id} className="double-margin-bottom flex row align-top space-between">
              <CartItem cartItem={item} />
              <ShippingOptionSelector item={item} form={form} index={index} />
            </div>
          ))}

          <Button type="submit" color="teal" radius={0} className="full-width double-margin-top" disabled={!allOptionsSelected}>
            Save Shipping Options
          </Button>
        </form>
      </Card>

      <ShippingInfoModal opened={opened} close={close} />
    </div>
  );
}

export default ShippingOptionsForm;