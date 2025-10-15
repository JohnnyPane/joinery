import { IconCurrencyDollar, IconNumber } from '@tabler/icons-react'
import { NumberInput, Select, Textarea, TextInput, Checkbox, Grid } from "@mantine/core";
import { productTypeOptions } from "../../utils/productConfigs.js";

const ProductDetailsForm = ({ form, formType = 'create', product = null }) => {
  return (
    <Grid>
      <Grid.Col span={12}>
        <TextInput
          label="Product Name"
          placeholder="Enter product name"
          value={product ? product.name : ''}
          {...form.getInputProps('name')}
          className="margin-bottom"
        />
      </Grid.Col>

      <Grid.Col span={12}>
        <Textarea
          label="Description"
          placeholder="Tell us about the product, where it's from, what it's made of, any special features, etc."
          value={product ? product.description : ''}
          {...form.getInputProps('description')}
          className="margin-bottom"
        />
      </Grid.Col>

      <Grid.Col span={6}>
        <Checkbox
          label="Request a Quote"
          description="Check this box if you want customers to request a quote for this product instead of purchasing it directly."
          checked={form.values.requestable}
          color="teal"
          {...form.getInputProps('requestable', { type: 'checkbox' })}
          className="margin-bottom"
        />
      </Grid.Col>

      <Grid.Col span={6}>
        <Checkbox
          label="Biddable"
          description="Check this box if you want to allow customers to place bids on this product (they can sill buy it outright)."
          checked={form.values.biddable}
          color="teal"
          {...form.getInputProps('biddable', { type: 'checkbox' })}
          className="margin-bottom"
        />
      </Grid.Col>

      {!form.values.requestable && (
        <>
          <Grid.Col span={6}>
            <NumberInput
              label="Price"
              placeholder="Enter product price"
              value={product ? product.price_in_cents / 100 : ''}
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
              value={product ? product.quantity : ''}
              leftSection={<IconNumber size={18} />}
              {...form.getInputProps('quantity')}
              className="margin-bottom"
              min={0}
              step={1}
            />
          </Grid.Col>
        </>
      )}

      <Grid.Col span={12}>
        <Select
          label="Product Type"
          placeholder="Select product type"
          value={product ? product.productable_type : ''}
          disabled={formType === 'update'}
          data={productTypeOptions}
          {...form.getInputProps('productable_type')}
          className="margin-bottom"
        />
      </Grid.Col>
    </Grid>
  )
}

export default ProductDetailsForm;
