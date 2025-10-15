import { Image, Text, Badge, Button } from "@mantine/core";
import { getImageUrl } from "../../utils/imageConfigs.js";
import { moneyDisplay } from "../../utils/humanizeText.js";
import { shippingOptionDisplayNames } from "../../utils/shippingConfigs.js";

const orderStatusColors = {
  awaiting_fulfillment: 'yellow',
  shipped: 'teal',
  delivered: 'violet',
  complete: 'green',
  cancelled: 'red',
}

const orderStatusDisplayNames = {
  awaiting_fulfillment: 'Awaiting Fulfillment',
  shipped: 'Shipped',
  delivered: 'Delivered',
  complete: 'Complete',
  cancelled: 'Cancelled',
}

const StoreOrderItemDetails = ({ item }) => {
  const { product } = item;
  const price = item.quote_request ? item.quote_request.amount_in_cents : product.price_in_cents;

  const imageUrl = getImageUrl(product.images[0].image_url);

  return (
    <div className="order-item-details">
      <div className="flex row align-top">
        <Image radius={8} src={imageUrl} alt={product.name} style={{ width: "150px"}} fit="contain" className="double-margin-bottom" />

        <div className="margin-left">
          <Text size="md" className="bold">{product.name}</Text>
          <Text size="sm" color="dimmed" className="italic margin-bottom">{product.productable_type}</Text>
          <Text size="sm" className="bold">{moneyDisplay(price)}</Text>
          <Text size="sm" color="dimmed" className="margin-bottom">Quantity: {item.quantity}</Text>
          <Badge style={{ textTransform: 'none' }} color={orderStatusColors[item.status]} variant="light">{orderStatusDisplayNames[item.status]}</Badge>
          {/*<Text color={orderStatusColors[item.status]} size="sm" className="bold">{orderStatusDisplayNames[item.status]}</Text>*/}
        </div>
      </div>

      <div>
        {item.fulfillment_method === "shipping" && <>
          <Text size="md" className="bold margin-right">Shipping Address</Text>
          <Text>{item.shipping_address}</Text>
        </>}

        <Text size="md" className="bold margin-top">Shipping Method</Text>
        <Text className="italic">{shippingOptionDisplayNames[item.shipping_option.shipping_type]}</Text>
      </div>
    </div>
  );
}

export default StoreOrderItemDetails;
