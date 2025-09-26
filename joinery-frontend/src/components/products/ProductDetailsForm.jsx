import {NumberInput, Select, Textarea, TextInput} from "@mantine/core";

const ProductDetailsForm = ({ form }) => {
  return (
    <>
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
    </>
  )
}

export default ProductDetailsForm;
