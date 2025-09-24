import { useForm } from "@mantine/form";
import { TextInput, NumberInput, Textarea, Button, Card, Text, Select } from "@mantine/core";

import { productFieldConfigs } from "../utils/productFieldConfigs.js";

import { useMe } from '../hooks/useMe.js';
import useCreateResource from "../hooks/useCreateResource.js";
import JoineryFormFields from "./ui/JoineryFormFields.jsx";

const ProductForm = () => {
  const createProduct = useCreateResource('products');
  const { data: user } = useMe();

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

  const handleSubmit = (values) => {

    const payload = {
      name: values.name,
      description: values.description,
      price_in_cents: values.price_in_cents,
      quantity: values.quantity,
      store_id: user?.current_store?.id,
      productable_type: values.productable_type,
      productable_attributes: values.productable,
    }

    createProduct.mutate(payload);
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="product-form">
      <Text size="lg" weight={500}>
        Add New Product
      </Text>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Product Name"
          placeholder="Enter product name"
          {...form.getInputProps('name')}
          className="margin-bottom"
        />
        <Textarea
          label="Description"
          placeholder="Enter product description"
          {...form.getInputProps('description')}
          className="margin-bottom"
        />
        <NumberInput
          label="Price (in cents)"
          placeholder="Enter product price"
          {...form.getInputProps('price_in_cents')}
          className="margin-bottom"
          min={0}
        />
        <NumberInput
          label="Stock Quantity"
          placeholder="Enter stock quantity"
          {...form.getInputProps('quantity')}
          className="margin-bottom"
          min={0}
          step={1}
        />
        <Select
          label="Product Type"
          placeholder="Select product type"
          data={['Slab', 'Board']}
          {...form.getInputProps('productable_type')}
          className="margin-bottom"
        />

        {form.values.productable_type && productFieldConfigs[form.values.productable_type] && (
          productFieldConfigs[form.values.productable_type].map((fieldConfig) => {
            return JoineryFormFields({ form, fieldConfig, nestedFieldType: 'productable'});
          })
        )}

        <div>
          <Button type="submit" className="full-width margin-40-t">Add Product</Button>
        </div>
      </form>
    </Card>
  );
}

export default ProductForm;