import { moneyDisplay } from "./humanizeText.js";

export const shippingOptionDisplayNames = {
  flat_rate: 'Flat Rate',
  pickup: 'Free Pickup',
  quote: 'Request a Quote',
}

export const orderShippingStatuses = {
  awaiting_pickup: 'Awaiting Pickup',
  awaiting_fulfillment: 'Awaiting Fulfillment',
  shipped: 'Shipped',
  delivered: 'Delivered',
  complete: 'Complete',
  canceled: 'Canceled',
}

export const optionDisplayText = (cents, shipping_type) => {
  const label = shippingOptionDisplayNames[shipping_type] || shipping_type;

  if (cents === 0) return label;
  return `${label} - ${moneyDisplay(cents)}`;
}