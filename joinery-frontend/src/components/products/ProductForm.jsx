import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";

import { useMe } from '../../hooks/useMe.js';
import { useCreateResource, useUpdateResource } from "../../hooks/useResourceMutations.js";
import { createApi } from "../../services/createApi.js";

import ProductDetailsForm from "./ProductDetailsForm.jsx";
import JoineryStepForm from "../ui/JoineryStepForm.jsx";
import ProductableDetailsForm from "./ProductableDetailsForm.jsx";
import JoineryImageUploader from "../ui/JoineryImageUploader.jsx";
import ProductShippingOptionsForm from "./ProductShippingOptionsForm.jsx";

const productsApi = createApi('products');

const shippingOptions = [
  { value: 'flat_rate', label: 'Flat Rate', type: 'flat_rate', hasPrice: true },
  { value: 'pickup', label: 'Free Pickup', type: 'pickup', hasPrice: false },
  { value: 'quote', label: 'Request a Quote', type: 'quote' },
];


const ProductForm = () => {
  const [goToNextStep, setGoToNextStep] = useState(false);

  const { data: user } = useMe();
  const createProduct = useCreateResource('products');
  const updateProduct = useUpdateResource('products');
  const createShippingOption = useCreateResource('shipping_options');

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      price_in_cents: 0,
      quantity: 0,
      productable_type: '',
      productable: {},
      flat_rate: { enabled: false, price_in_cents: 0 },
      pickup: { enabled: false },
      quote: { enabled: false },
    },
    transformValues: (values) => ({
      ...values,
      price_in_cents: Math.round(values.price_in_cents * 100),
    }),
    validate: {
      name: (value) => (value.length > 0 ? null : 'Name is required'),
      price_in_cents: (value) => (value >= 0 ? null : 'Price must be non-negative'),
      quantity: (value) => (Number.isInteger(value) && value >= 0 ? null : 'Stock must be a non-negative integer'),
    },
  });

  const handleProductSubmit = async (values) => {

    const payload = {
      name: values.name,
      description: values.description,
      price_in_cents: values.price_in_cents,
      quantity: values.quantity,
      store_id: user?.current_store?.id,
      productable_type: values.productable_type,
      productable_attributes: values.productable,
    }

    if (values.id) {
      updateProduct.mutate({ id: values.id, ...payload });
      return;
    }

    const newProduct = await createProduct.mutateAsync(payload);
    form.setFieldValue("id", newProduct.id);
  }

  const handleImagesUploaded = () => {
    setGoToNextStep(true);
  }

  const handleShippingOptionsSubmit = (values) => {
    shippingOptions.forEach(shippingOption => {
      const optionValues = values[shippingOption.type];
      if (optionValues.enabled) {
        const payload = {
          product_id: values.id,
          option_type: shippingOption.type,
          price_in_cents: optionValues.price_in_cents ? Math.round(optionValues.price_in_cents * 100) : 0,
        }
        createShippingOption.mutate(payload);
      }
    })

    navigate(`/products/${values.id}`);
  }

  const productTypeSelected = form.values.productable_type;
  const shippingOptionSelected = form.values.flat_rate.enabled || form.values.pickup.enabled || form.values.quote.enabled;

  const formSteps = [
    { component: <ProductDetailsForm  form={form} />, title: 'Product Information', isNextDisabled: !productTypeSelected },
    { component: <ProductableDetailsForm form={form} />,
      title: 'Dimensions and Details',
      isNextDisabled: false,
      onNext: form.onSubmit(handleProductSubmit)
    },
    {
      component: <JoineryImageUploader resourceId={form.values.id} uploadApi={productsApi} onSuccessfulUpload={handleImagesUploaded} />,
      title: 'Upload Images',
      hideNext: true
    },
    {
      component: <ProductShippingOptionsForm shippingOptions={shippingOptions} form={form} />,
      title: 'Shipping Options',
      isNextDisabled: !shippingOptionSelected
    },
  ]

  return (
    <form>
      <JoineryStepForm steps={formSteps} onComplete={form.onSubmit(handleShippingOptionsSubmit)} nextStepFlag={goToNextStep} setNextFlag={setGoToNextStep} />
    </form>
  );
}

export default ProductForm;