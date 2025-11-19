import {Badge, Card, Group, Image, Text, Title} from "@mantine/core";
import {statusColors} from "../../utils/colorConfigs.js";
import {getImageUrl} from "../../utils/imageConfigs.js";

const QuoteCard = ({ item, onClick }) => {
  const { id, attributes } = item;
  const { product, quote_type, status, requires_action } = attributes

  const handleClick = () => {
    onClick(item)
  }

  const imageUrl = getImageUrl(product.images[0].image_url)

  return (
    <Card shadow="sm" onClick={handleClick}>
      <div className="flex row space-between margin-4-b">
        <Text size="sm">Quote: {id}</Text>

        <Group spacing="xs">
          {requires_action && (
            <Badge color="" size="sm" variant="outline">
              Response Needed
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

          <Text size="sm" color="dimmed" className="italic margin-4-b">
            Quote Type: {quote_type}
          </Text>

          <Badge color={statusColors(status)} size="sm" variant="light">
            {status}
          </Badge>
        </div>
      </div>
    </Card>
  )
};

export default QuoteCard;