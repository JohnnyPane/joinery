import { Text, Card, Badge, Image, Group } from "@mantine/core";
import { orderShippingStatuses, shippingOptionDisplayNames } from "../../utils/shippingConfigs.js";
import { getImageUrl } from '../../utils/imageConfigs.js'
import { statusColors } from "../../utils/colorConfigs.js";

const OrderCard = ({ item, onClick }) => {
  const { id, attributes } = item;
  const { product, status, requires_action, shipping_option } = attributes

  const handleClick = () => {
    onClick(item);
  }

  const imageUrl = getImageUrl(product.images[0].image_url)

  return (
    <Card shadow="sm" onClick={handleClick}>
      <div className="flex row space-between margin-4-b">
        <Text size="sm">Order: {id}</Text>

        <Group spacing="xs">
          {requires_action && (
            <Badge color="red" size="sm" variant="outline">
              Action Required
            </Badge>
          )}
        </Group>
      </div>

      <div className="flex row">
        <Image
          src={imageUrl}
          className="order-card-image"
        />

        <div>
          <Text className="bold" size="md">{product.name}</Text>

          <Text size="sm" className="italic margin-4-b">
            Shipping Type: {shippingOptionDisplayNames[shipping_option.shipping_type]}
          </Text>

          <Badge color={statusColors(status)} size="sm" variant="light">
            {orderShippingStatuses[status]}
          </Badge>
        </div>
      </div>
    </Card>
  )
}

export default OrderCard;