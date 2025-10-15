import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Text, Textarea, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { useCart } from "../../hooks/useCart.js";
import { useUpdateResource } from '../../hooks/useResourceMutations.js';
import { moneyDisplay } from "../../utils/humanizeText.js";

const actionConfig = {
  accept: {
    title: "Accept Quote",
    description: "Are you sure you want to accept this quote?",
    actionLabel: "Accept Quote",
    actionColor: "green",
    cancelLabel: "Cancel",
  },
  decline: {
    title: "Decline Quote",
    description: "Are you sure you want to decline this quote?",
    actionLabel: "Decline Quote",
    actionColor: "red",
    cancelLabel: "Cancel",
  },
  respond: {
    title: "Respond To Quote Request",
    description: "Send your response to the quote request.",
    actionLabel: "Send Response",
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

const QuoteResponseModal = ({ onClose, quote, action, price }) => {
  const [message, setMessage] = useState('');
  const { mutateAsync: updateQuoteRequest } = useUpdateResource('quote_requests');
  const { fetchUserCart } = useCart();

  const navigate = useNavigate();

  const actionDetails = actionConfig[action] || actionConfig['respond'];
  const displayPrice = price > 0 ? "$" + (price).toFixed(2) : moneyDisplay(quote.latest_quote.amount_in_cents);

  const handleSubmit = async () => {
    const payload = {
      id: quote.id,
      quote_attributes: {
        message,
        action,
        amount_in_cents: price ? parseInt(price * 100) : quote.latest_quote.amount_in_cents
      }
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
      if (action === 'accept') {
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
  }

  return (
    <div>
      <div className="double-margin-bottom">
        <Text size="lg" className="bold margin-bottom">{actionDetails.title}</Text>
        <Text className="margin-bottom">{actionDetails.description}</Text>
        {(price > 0 || quote.latest_quote.amount_in_cents > 0) && <Text className="margin-bottom">{displayPrice}</Text>}

        <Textarea
          size="lg"
          placeholder="Enter your message"
          value={message}
          onChange={(event) => setMessage(event.currentTarget.value)}
          minRows={4}
          className="margin-bottom"
        />
      </div>

      <div className="flex row space-between double-margin-top">
        <Button onClick={onClose} variant="subtle" color="gray">Return to Quote</Button>
        <Button onClick={handleSubmit} color={actionDetails.actionColor} variant="subtle" className="margin-right" disabled={!message}>
          {actionDetails.actionLabel}
        </Button>
      </div>
    </div>
  );
}

export default QuoteResponseModal;