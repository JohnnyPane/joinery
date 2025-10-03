import { Switch, NumberInput, Group, Text, Grid } from "@mantine/core";
import { IconCurrencyDollar } from "@tabler/icons-react";

const optionsSubtexts = {
  flat_rate: "Shipping cost is the same regardless of destination, can be set to $0.",
  pickup: "Customer will pick up the product themselves, we do not charge for this option.",
  quote: "Customer will request a shipping quote for this product and cost will be determined by you (the seller).",
}


const ProductShippingOptionsForm = ({ shippingOptions, form }) => {

  return (
    <>
      <Text weight={500} size="lg" mb="sm">Shipping Options</Text>
      <Text weight={400} size="sm" mb="md" color="dimmed">
        Select the shipping options you want to offer for this product. You can enable multiple options, but only one of Flat Rate or Request a Quote.
      </Text>

      {shippingOptions.map((option) => (
        <div key={option.value} className="margin-bottom">
          <div className="flex align-center">
            <Switch
              className="clickable margin-right"
              withThumbIndicator={false}
              checked={form.values[option.type].enabled}
              onChange={(event) => {
                const checked = event.currentTarget.checked;
                form.setFieldValue(`${option.type}.enabled`, checked);

                if (checked && ['flat_rate', 'quote'].includes(option.type)) {
                  ['flat_rate', 'quote'].forEach((other) => {
                    if (other !== option.type) {
                      form.setFieldValue(`${other}.enabled`, false);
                    }
                  });
                }
              }}
            />
            <div className="margin-left">
              <Text>{option.label}</Text>
              <Text size="sm" color="dimmed">{optionsSubtexts[option.type]}</Text>
            </div>
          </div>

          {option.hasPrice && form.values[option.type].enabled && (
            <Grid>
              <Grid.Col span={6}>
                <NumberInput
                  label="Price"
                  leftSection={<IconCurrencyDollar size={16} />}
                  {...form.getInputProps(`${option.type}.price_in_cents`)}
                  min={0}
                  decimalScale={2}
                  fixedDecimalScale
                  step={0.01}
                  mb="sm"
                />
              </Grid.Col>
            </Grid>
          )}
        </div>
      ))}
    </>
  );
}

export default ProductShippingOptionsForm;