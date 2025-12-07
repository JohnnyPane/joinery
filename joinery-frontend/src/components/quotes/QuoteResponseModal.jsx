import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {Text, Textarea, Button, Radio, CheckIcon, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { useCart } from "../../hooks/useCart.js";
import { useUpdateResource } from '../../hooks/useResourceMutations.js';
import {moneyDisplay, readableDateTime} from "../../utils/humanizeText.js";
import { optionDisplayText } from "../../utils/shippingConfigs.js";
import { productUnitDisplays } from "../../utils/productDimensions.js";
import JoineryAvatar from '../ui/JoineryAvatar.jsx';

const actionConfig = {
  accept: {
    title: "Accept Quote",
    description: "Are you sure you want to accept this quote?",
    actionLabel: "Accept",
    actionColor: "green",
    cancelLabel: "Cancel",
  },
  decline: {
    title: "Decline Quote",
    description: "Are you sure you want to decline this quote?",
    actionLabel: "Decline",
    actionColor: "red",
    cancelLabel: "Cancel",
  },
  respond: {
    title: "Respond To Quote Request",
    description: "Send your response to the quote request.",
    actionLabel: "Respond",
    actionColor: "blue",
    cancelLabel: "Cancel",
  },
  offer: {
    title: "Make an Offer",
    description: "Send your offer to the buyer.",
    actionLabel: "Send Offer",
    actionColor: "blue",
    cancelLabel: "Cancel",
  },
  cancel: {
    title: "Cancel Quote",
    description: "Are you sure you want to cancel this quote?",
    actionLabel: "Cancel Quote",
    actionColor: "red",
    cancelLabel: "Keep Quote",
  }
}

const ShippingOptionsSelect = ({ shippingOptions, selectedOption, setSelectedOption }) => {

  return (
    <div className="double-margin-top double-margin-bottom">

      <Text size="md" className="bold margin-bottom">This product's shipping requires a quote, would you like to request a shipping quote?</Text>

      <Radio.Group
        name={"shipping_option"}
        value={selectedOption}
        onChange={setSelectedOption}
      >
        {shippingOptions.map(option => (
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
    </div>
  );
}

const QuoteResponseModal = ({ onClose, quote, action, price }) => {
  const [message, setMessage] = useState('');
  const [selectedShippingOption, setSelectedShippingOption] = useState(null);
  const { mutateAsync: updateQuoteRequest } = useUpdateResource('quote_requests');
  const { fetchUserCart } = useCart();

  const navigate = useNavigate();

  const { buyer, seller, latest_quote } = quote;
  const actionDetails = actionConfig[action] || actionConfig['respond'];

  const shippingIncludesQuote = quote.product.shipping_options.some(option => option.shipping_type === 'quote');
  const showShippingOptions = (action === 'accept' && shippingIncludesQuote && quote.quote_type === 'product');
  const quoteShippingSelected = quote.product.shipping_options.find(option => option.shipping_type === 'quote')?.id === parseInt(selectedShippingOption);

  const handleSubmit = async () => {
    const finalAction = quoteShippingSelected ? 'accept_with_shipping_quote' : action;
    const payload = {
      id: quote.id,
      quotes_attributes: [{
        message,
        action: finalAction,
        amount_in_cents: price ? parseInt(price * 100) : quote.latest_quote.amount_in_cents
      }],
    }
    try {
      await updateQuoteRequest(payload);
      notifications.show({
        title: 'Success',
        message: `Quote ${action}ed successfully`,
        position: 'top-right',
        color: 'green',
      });
      onClose();
      if (action === 'accept' && !quoteShippingSelected) {
        await fetchUserCart();
        navigate('/checkout/shipping_options');
      }
    } catch (err) {
      notifications.show({
        title: 'Error',
        message: `Error ${action}ing quote: ${err.response?.data?.error || err.message}`,
        position: 'top-right', color: 'red'
      });
    }
  };

  const volumeUnit = productUnitDisplays[quote.pricing_unit] || quote.requested_volume == 1.0 ? 'unit' : 'units';
  const priceDisplay = price ? moneyDisplay(price * 100) : moneyDisplay(latest_quote.amount_in_cents);

  return (
    <div>
      <div className="double-margin-bottom">
        {/*<Text size="lg" className="bold">{actionDetails.title}</Text>*/}
        <div className="flex row align-center margin-bottom">
          <Title order={2}>Latest offer: {priceDisplay}</Title>
        </div>

        <div className="flex row align-center double-margin-bottom">
          <JoineryAvatar user={latest_quote.role === 'buyer' ? buyer : seller} />

          <div className="flex column margin-left">
            <Text size="xs" color="dimmed">{readableDateTime(latest_quote.created_at)}</Text>
            <Text>{latest_quote.message}</Text>
          </div>
        </div>

        <div className="double-margin-bottom">
          <Text size="lg"><strong>Quote Type:</strong> {quote.quote_type} quote</Text>
          <Text size="lg"><strong>Product:</strong> {quote.product.name}</Text>
          <Text size="lg"><strong>Requested Volume:</strong> {quote.requested_volume} {volumeUnit}</Text>
        </div>

        {showShippingOptions &&
          <ShippingOptionsSelect
            shippingOptions={quote.product.shipping_options}
            selectedOption={selectedShippingOption}
            setSelectedOption={setSelectedShippingOption}
          />
        }

        <Textarea
          size="lg"
          placeholder="Enter your message"
          value={message}
          onChange={(event) => setMessage(event.currentTarget.value)}
          minRows={4}
          className="margin-bottom"
        />
      </div>

      {!quoteShippingSelected && <Text className="center-text double-margin-top">{actionDetails.description}</Text>}

      <div className="flex row space-between double-margin-top">
        <Button onClick={onClose} variant="subtle" color="gray">Return to Quote</Button>
        <Button onClick={handleSubmit} color={actionDetails.actionColor} variant="subtle" className="margin-right" disabled={!message}>
          {quoteShippingSelected ? "Request Shipping Quote" : actionDetails.actionLabel}
        </Button>
      </div>
    </div>
  );
}

export default QuoteResponseModal;