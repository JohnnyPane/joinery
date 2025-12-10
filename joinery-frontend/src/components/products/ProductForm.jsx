import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

import { useMe } from '../../hooks/useMe.js';
import { useCreateResource, useUpdateResource } from "../../hooks/useResourceMutations.js";
import { createApi } from "../../services/createApi.js";

import ProductDetailsForm from "./ProductDetailsForm.jsx";
import JoineryStepForm from "../ui/JoineryStepForm.jsx";
import ProductableDetailsForm from "./ProductableDetailsForm.jsx";
import JoineryImageUploader from "../ui/JoineryImageUploader.jsx";
import ProductShippingOptionsForm from "./ProductShippingOptionsForm.jsx";
import { productableDetailsFilled } from "../../utils/productConfigs.js";
import { submittableShippingOptions, useProductForm } from "../../hooks/useProductForm.js";

const productsApi = createApi('products');

const transformProductableAttributes = async (productableType, values) => {
  let productableAttributes = values || {};

  if (productableType === 'Lumber') {
    if (productableAttributes.finish_type === 'rough' || productableAttributes.finish_type === 'resawn') {
      const thickness = productableAttributes.rough_thickness;
      const width = productableAttributes.rough_width;
      productableAttributes.nominal_dimension = `${thickness} x ${width}`;

      productableAttributes = (({ rough_thickness, rough_width, ...rest }) => rest)(productableAttributes);
    }
  }

  return productableAttributes;
}

const ProductForm = () => {
  const [goToNextStep, setGoToNextStep] = useState(false);

  const { data: user } = useMe();
  const createProduct = useCreateResource('products');
  const updateProduct = useUpdateResource('products');

  const navigate = useNavigate();

  const form = useProductForm();

  const handleProductSubmit = async (values) => {
    const productableAttributes = await transformProductableAttributes(values.productable_type, values.productable);

    const payload = {
      name: values.name,
      description: values.description,
      price_per_unit_in_cents: Math.round(values.price_per_unit_in_cents * 100),
      available_volume: values.available_volume,
      pricing_unit: values.pricing_unit,
      min_order_unit: values.min_order_unit,
      requestable: values.requestable,
      biddable: values.biddable,
      store_id: user?.current_store?.id,
      productable_type: values.productable_type,
      productable_attributes: productableAttributes,
    }

    if (values.id) {
      await updateProduct.mutateAsync({ id: values.id, ...payload });
      return;
    }

    const newProduct = await createProduct.mutateAsync(payload);
    form.setFieldValue("id", newProduct.id);
  }

  const validateAndSubmit = async () => {
    const validationResult = form.validate();

    if (validationResult.hasErrors) {
      throw new Error("Client-side validation failed.");
    }

    await handleProductSubmit(form.values);
  };

  const handleImagesUploaded = () => {
    setGoToNextStep(true);
  }

  const handleShippingOptionsSubmit = async () => {
    // Call form.values instead of passing from form to allow async behavior - need to validate form
    const shipping_options_attributes = submittableShippingOptions(form.values);

    try {
      await updateProduct.mutateAsync({
        id: form.values.id,
        shipping_options_attributes: shipping_options_attributes,
      })
      notifications.show({ message: `${form.values.name} created`, color: 'green', position: 'top-right' });
      navigate(`/products/${form.values.id}`);
    } catch (error) {
      notifications.show({ message: `Error updating shipping options: ${error.message}`, color: 'red', position: 'top-right' });
    }
  }

  const productTypeSelected = form.values.productable_type;
  const productDetailsFilled = productableDetailsFilled(form.values);
  const shippingOptionSelected = form.values.flat_rate.enabled || form.values.pickup.enabled || form.values.quote.enabled;

  const formSteps = [
    { component: <ProductDetailsForm  form={form} />, title: 'Product Information', isNextDisabled: !productTypeSelected },
    { component: <ProductableDetailsForm form={form} />,
      title: 'Dimensions and Details',
      isNextDisabled: !productDetailsFilled,
      onNext: validateAndSubmit
    },
    {
      component: <JoineryImageUploader resourceId={form.values.id} uploadApi={productsApi} onSuccessfulUpload={handleImagesUploaded} />,
      title: 'Upload Images',
      hideNext: true
    },
    {
      component: <ProductShippingOptionsForm form={form} />,
      title: 'Shipping Options',
      isNextDisabled: !shippingOptionSelected
    },
  ]

  return (
    <form className="double-margin-bottom">
      <JoineryStepForm steps={formSteps} onComplete={handleShippingOptionsSubmit} nextStepFlag={goToNextStep} setNextFlag={setGoToNextStep} />
    </form>
  );
}

export default ProductForm;