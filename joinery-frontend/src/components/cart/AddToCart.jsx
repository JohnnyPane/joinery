import { useState } from 'react';
import { Button, NumberInput, Text, Textarea, Modal, Radio, CheckIcon, Tooltip } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

import useResource from '../../hooks/useResource.js';
import { useMe } from '../../hooks/useMe.js';
import { useCart } from '../../hooks/useCart.js';
import { optionDisplayText } from "../../utils/shippingConfigs.js";

const hasQuoteShipping = (product) => {
  return product?.shipping_options?.some(option => option.shipping_type === 'quote');
}

const unitIcons = {
  cubic_foot: 'cu ft.',
  board_foot: 'bf.',
  linear_foot: 'lin. ft.',
  square_foot: 'sq. ft.',
  each: '',
};

const AddToCart = ({ productId, message, setMessage, quoteRequestSubmit }) => {
  const { data: user } = useMe();
  const [quantity, setQuantity] = useState(1);
  const { cart, addItem } = useCart();
  const { data: product, isLoading, isError } = useResource('products', productId);
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
        ordered_volume: quantity,
        shipping_option_id: selectedShippingOption
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

  const submitShippingOption = async () => {
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
      await quoteRequestSubmit('shipping', quantity);
      setMessage('');
      setSelectedShippingOption(null);
      closeQuoteModal();
    } else {
      await handleAddToCart();
      closeQuoteModal();
    }
  }

  const quoteButtonDisabled = (quoteShippingSelected && !message) || !selectedShippingOption

  const cartItemAlreadyInCart = cart?.cart_items?.find(item => item.product_id === productId);
  const availableQuantity = product ? product.available_volume - (cartItemAlreadyInCart ? cartItemAlreadyInCart.ordered_volume : 0) : product.available_volume;
  const isOutOfStock = availableQuantity <= 0;
  const addedMaxQuantity = product.available_volume === (cartItemAlreadyInCart ? cartItemAlreadyInCart.ordered_volume : 0);

  return (
    <div className="flex column">
      <div className="flex row">
        <NumberInput
          className="product-detail-stock"
          value={quantity}
          suffix={` ${unitIcons[product.pricing_unit]}`}
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
              <Tooltip
                refProp="rootRef"
                label="You must be logged in to request a shipping quote."
                disabled={ user || option.shipping_type !== 'quote' }
                key={option.id}
                withArrow
                arrowSize={5}
                arrowOffset={40}
                position="top-start"
              >
                <Radio
                  key={option.id}
                  value={String(option.id)}
                  label={optionDisplayText(option.price_in_cents, option.shipping_type)}
                  icon={CheckIcon}
                  className="margin-bottom clickable"
                  color="teal"
                  disabled={option.shipping_type === 'quote' && !user}
                />
              </Tooltip>
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

          <Button onClick={submitShippingOption} variant="subtle" color={quoteShippingSelected ? "indigo" : "teal"} disabled={quoteButtonDisabled} >
            {quoteShippingSelected ? 'Request Quote' : 'Add to Cart'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default AddToCart;

