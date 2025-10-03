import { IconCurrencyDollar, IconNumber } from '@tabler/icons-react'
import { NumberInput, Select, Textarea, TextInput, Grid } from "@mantine/core";

const ProductDetailsForm = ({ form }) => {
  return (
    <Grid>
      <Grid.Col span={12}>
        <TextInput
          label="Product Name"
          placeholder="Enter product name"
          {...form.getInputProps('name')}
          className="margin-bottom"
        />
      </Grid.Col>

      <Grid.Col span={12}>
        <Textarea
          label="Description"
          placeholder="Tell us about the product, where it's from, what it's made of, any special features, etc."
          {...form.getInputProps('description')}
          className="margin-bottom"
        />
      </Grid.Col>

      <Grid.Col span={6}>
        <NumberInput
          label="Price"
          placeholder="Enter product price"
          leftSection={<IconCurrencyDollar size={16} />}
          {...form.getInputProps('price_in_cents')}
          className="margin-bottom"
          decimalScale={2}
          fixedDecimalScale
          min={0}
        />
      </Grid.Col>

      <Grid.Col span={6}>
        <NumberInput
          label="Quantity"
          placeholder="Enter stock quantity"
          leftSection={<IconNumber size={18} />}
          {...form.getInputProps('quantity')}
          className="margin-bottom"
          min={0}
          step={1}
        />

      </Grid.Col>

      <Grid.Col span={12}>
        <Select
          label="Product Type"
          placeholder="Select product type"
          data={['Slab']}
          {...form.getInputProps('productable_type')}
          className="margin-bottom"
        />
      </Grid.Col>
    </Grid>
  )
}

export default ProductDetailsForm;
