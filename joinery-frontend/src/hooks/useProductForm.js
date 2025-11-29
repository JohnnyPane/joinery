import { useForm } from "@mantine/form";

export const getInitialProductFormValues = (product) => ({
  id: product?.id || null,
  name: product?.name || '',
  description: product?.description || '',
  price_in_cents: product?.price_in_cents ? product.price_in_cents / 100 : 0,
  quantity: product?.quantity || 1,
  requestable: product?.requestable || false,
  biddable: product?.biddable || false,
  productable_type: product?.productable_type || '',
  productable: product?.productable || {},
  flat_rate: {
    id: product?.shipping_options?.find(so => so.shipping_type === 'flat_rate')?.id || null,
    enabled: product?.shipping_options.find(so => so.shipping_type === 'flat_rate')?.enabled || false,
    price_in_cents: product?.shipping_options?.find(so => so.shipping_type === 'flat_rate')?.price_in_cents
      ? product.shipping_options.find(so => so.shipping_type === 'flat_rate').price_in_cents / 100
      : 0,
  },
  pickup: {
    id: product?.shipping_options?.find(so => so.shipping_type === 'pickup')?.id || null,
    enabled: product?.shipping_options.find(so => so.shipping_type === 'pickup')?.enabled || false,
  },
  quote: {
    id: product?.shipping_options?.find(so => so.shipping_type === 'quote')?.id || null,
    enabled: product?.shipping_options.find(so => so.shipping_type === 'quote')?.enabled || false,
  },
});

export const submittableShippingOptions = (values) => {
  let shipping_options_attributes = [];

  const shippingOptionTypes = ['flat_rate', 'pickup', 'quote'];

  shippingOptionTypes.forEach((type) => {
    const optionValues = values[type];
    const optionPriceInCents = optionValues.price_in_cents ? Math.round(optionValues.price_in_cents * 100) : 0;

    if (optionValues.id || optionValues.enabled) {
      shipping_options_attributes.push({
        id: optionValues?.id,
        shipping_type: type,
        enabled: optionValues.enabled,
        price_in_cents: optionPriceInCents
      });
    }
  });

  return shipping_options_attributes;
};

export const useProductForm = (product = null) => {
  return useForm({
    initialValues: getInitialProductFormValues(product),
    transformValues: (values) => ({
      ...values,
      price_in_cents: Math.round(values.price_in_cents * 100),
      flat_rate: {
        ...values.flat_rate,
        price_in_cents: values.flat_rate.enabled ? Math.round(values.flat_rate.price_in_cents * 100) : 0,
      },
    }),
    validate: {
      name: (value) => (value.length > 0 ? null : 'Name is required'),
      price_in_cents: (value) => (value >= 0 ? null : 'Price must be non-negative'),
      quantity: (value) => (Number.isInteger(value) && value >= 0 ? null : 'Stock must be a non-negative integer'),
      flat_rate: {
        price_in_cents: (value) => {
          if (value.enabled) {
            return value.price_in_cents >= 0 ? null : 'Flat rate price must be non-negative';
          }
          return null;
        }
      },
    },
  });
};