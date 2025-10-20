import { useState } from 'react';
import { Button, NumberInput, Text, Textarea, Modal, Drawer, Radio, CheckIcon } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

import useResource from '../../hooks/useResource.js';
import { useCart } from '../../hooks/useCart.js';
import { optionDisplayText } from "../../utils/shippingConfigs.js";

const hasQuoteShipping = (product) => {
  return product?.shipping_options?.some(option => option.shipping_type === 'quote');
}

const AddToCart = ({ productId, message, setMessage, quoteRequestSubmit }) => {
  const [quantity, setQuantity] = useState(1);
  const { cart, addItem } = useCart();
  const { data: product, isLoading, isError, error } = useResource('products', productId);
  const [selectedShippingOption, setSelectedShippingOption] = useState(null);
  const [quoteModalOpened, { open: openQuoteModal, close: closeQuoteModal }] = useDisclosure(false);

  if (isLoading) return <div>Loading...</div>;

  const requiresQuoteShipping = hasQuoteShipping(product);
  const chosenShippingOption = product.shipping_options.find(option => String(option?.id) === String(selectedShippingOption));
  const quoteShippingSelected = chosenShippingOption?.shipping_type === 'quote';


  const handleAddToCart = async () => {
    try {
      await addItem.mutateAsync({
        product_id: productId,
        quantity: quantity,
        shipping_option_id: selectedShippingOption?.id
      });

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

  const addToCartClick = async() => {
    if (requiresQuoteShipping) {
      openQuoteModal();
    } else {
      await handleAddToCart();
    }
  }

  const quoteShippingClick = async () => {
    if (!selectedShippingOption) {
      notifications.show({
        title: 'Error',
        message: 'Please select a shipping option to continue.',
        position: 'top-right',
        color: 'red',
      });
      return;
    }

    if (quoteShippingSelected) {
      await quoteRequestSubmit('shipping');
      setMessage('');
      setSelectedShippingOption(null);
      closeQuoteModal();
    } else {
      await handleAddToCart();
      closeQuoteModal();
    }
  }

  const quoteButtonDisabled = (quoteShippingSelected && !message) || !selectedShippingOption;

  const cartItemAlreadyInCart = cart?.cart_items?.find(item => item.product_id === productId);
  const availableQuantity = product ? product.quantity - (cartItemAlreadyInCart ? cartItemAlreadyInCart.quantity : 0) : product.quantity;
  const isOutOfStock = availableQuantity <= 0;
  const addedMaxQuantity = product.quantity === (cartItemAlreadyInCart ? cartItemAlreadyInCart.quantity : 0);

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
          <Button onClick={addToCartClick} variant="filled" color="green" disabled={isLoading || isError || isOutOfStock} className="product-detail-add-to-cart" fullWidth>
            Add to Cart
          </Button>

          {addedMaxQuantity && <Text color="dimmed" size="sm" className="margin-top">Added maximum available stock to cart</Text>}
        </div>
      </div>

      <Modal opened={quoteModalOpened} onClose={closeQuoteModal} title={<Text className="bold" size="lg">Select Shipping Option</Text>}>
        <Text className="double-margin-bottom">Shipping for this product requires a quote. If you want this item shipped you will need to request a quote.</Text>

        <div>
          <Radio.Group
            name={`cart-item-shipping-option-${productId}`}
            value={selectedShippingOption}
            onChange={setSelectedShippingOption}
          >
            {product.shipping_options.map(option => (
              <Radio
                key={option.id}
                value={String(option.id)}
                label={optionDisplayText(option.price_in_cents, option.shipping_type)}
                icon={CheckIcon}
                className="margin-bottom clickable"
                color="teal"
              />
            ))}
          </Radio.Group>

          {quoteShippingSelected && (
            <Textarea
              label="Additional Message for Quote"
              placeholder="Enter any additional details or requests for your quote here, please include address information if applicable."
              value={message}
              onChange={(event) => setMessage(event.currentTarget.value)}
              minRows={4}
              className="double-margin-top"
            />
          )}
        </div>

        <div className="flex row space-between margin-t-40">
          <Button onClick={closeQuoteModal} variant="subtle" color="gray" >
            Cancel
          </Button>

          <Button onClick={quoteShippingClick} variant="subtle" color={quoteShippingSelected ? "indigo" : "teal"} disabled={quoteButtonDisabled} >
            {quoteShippingSelected ? 'Request Quote' : 'Add to Cart'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default AddToCart;

