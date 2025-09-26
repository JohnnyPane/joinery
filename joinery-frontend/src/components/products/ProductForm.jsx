import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { Card } from "@mantine/core";

import { useMe } from '../../hooks/useMe.js';
import { useCreateResource, useUpdateResource } from "../../hooks/useResourceMutations.js";
import { createApi } from "../../services/createApi.js";

import ProductDetailsForm from "./ProductDetailsForm.jsx";
import JoineryStepForm from "../ui/JoineryStepForm.jsx";
import ProductableDetailsForm from "./ProductableDetailsForm.jsx";
import JoineryImageUploader from "../ui/JoineryImageUploader.jsx";

const productsApi = createApi('products');

const ProductForm = () => {
  const { data: user } = useMe();
  const createProduct = useCreateResource('products');
  const updateProduct = useUpdateResource('products');

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      price_in_cents: 0,
      quantity: 0,
      productable_type: '',
      productable: {}
    },

    validate: {
      name: (value) => (value.length > 0 ? null : 'Name is required'),
      price_in_cents: (value) => (value >= 0 ? null : 'Price must be non-negative'),
      quantity: (value) => (Number.isInteger(value) && value >= 0 ? null : 'Stock must be a non-negative integer'),
    },
  });

  const handleSubmit = async (values) => {

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

  const onComplete = () => {
    navigate(`/products/${form.values.id}`);
  }

  const productTypeSelected = form.values.productable_type;

  const formSteps = [
    { component: <ProductDetailsForm  form={form} />, isNextDisabled: !productTypeSelected },
    { component: <ProductableDetailsForm form={form} />, isNextDisabled: false, onNext: form.onSubmit(handleSubmit) },
    { component: <JoineryImageUploader resourceId={form.values.id} uploadApi={productsApi} onSuccessfulUpload={onComplete} />, isNextDisabled: false, hideNext: true },
  ]

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="product-form">
        <form>
          <JoineryStepForm steps={formSteps} onComplete={() => console.log("completing")} />
      </form>
    </Card>
  );
}

export default ProductForm;