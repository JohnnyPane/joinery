import { useState } from 'react';
import { Button, NumberInput, Text } from '@mantine/core';
import { notifications } from "@mantine/notifications";

import useResource from '../../hooks/useResource.js';
import { useCart } from '../../hooks/useCart.js';

const AddToCart = ({ productId }) => {
  const [quantity, setQuantity] = useState(1);
  const { cart, addItem } = useCart();
  const { data: product, isLoading, isError, error } = useResource('products', productId);

  console.log('product in AddToCart:',cart);

  if (isLoading) return <div>Loading...</div>;

  const handleAddToCart = async () => {
    try {
      await addItem.mutateAsync({ product_id: productId, quantity: quantity });
      notifications.show({
        title: 'Success',
        message: `${product.name} added to cart`,
        position: 'top-right',
        color: 'green',
      });
    } catch (err) {
      notifications.show({
        title: 'Error',
        message: `Error adding item to cart: ${err.response?.data?.error || err.message}`,
        position: 'top-right',
        color: 'red',
      });
    }
  }

  const cartItemAlreadyInCart = cart?.cart_items?.find(item => item.data.attributes.product_id === productId);
  const availableQuantity = product ? product.quantity - (cartItemAlreadyInCart ? cartItemAlreadyInCart.data.attributes.quantity : 0) : product.quantity;
  const isOutOfStock = availableQuantity <= 0;
  const addedMaxQuantity = product.quantity === (cartItemAlreadyInCart ? cartItemAlreadyInCart.data.attributes.quantity : 0);

  return (
    <div className="flex column">
      <div className="flex row">
        <NumberInput
          className="product-detail-stock"
          value={quantity}
          onChange={(val) => setQuantity(val)}
          min={1}
          max={availableQuantity || 1}
          step={1}
        />

        <div className="center-content column full-width">
          <Button onClick={handleAddToCart} disabled={isLoading || isError || isOutOfStock} className="product-detail-add-to-cart" fullWidth>
            Add to Cart
          </Button>

          {addedMaxQuantity && <Text color="dimmed" size="sm" className="margin-top">Added maximum available stock to cart</Text>}
        </div>
      </div>
    </div>

  );
}

export default AddToCart;

