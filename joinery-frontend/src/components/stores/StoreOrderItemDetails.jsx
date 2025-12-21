import { useState } from 'react';
import { Image, Text, Title, Badge, Button, Select, ThemeIcon, Anchor } from "@mantine/core";
import { IconStarFilled } from '@tabler/icons-react';

import { getImageUrl } from "../../utils/imageConfigs.js";
import { moneyDisplay } from "../../utils/humanizeText.js";
import { shippingOptionDisplayNames } from "../../utils/shippingConfigs.js";
import { statusColors } from "../../utils/colorConfigs.js";
import { orderStatusOptions } from "../../utils/orderUtils.js";

import ProductReviewForm from "../products/ProductReviewForm.jsx";
import useResource from "../../hooks/useResource.js";
import StarRatingDisplay from "../ui/StarRatingDisplay.jsx";


const orderStatusDisplayNames = {
  awaiting_shipping: 'Awaiting Shipping',
  awaiting_pickup: 'Awaiting Pickup',
  shipped: 'Shipped',
  delivered: 'Delivered',
  complete: 'Complete',
  cancelled: 'Cancelled',
}

const StoreOrderItemDetails = ({ itemId, handleStatusSelect, viewerType = 'buyer' }) => {
  const [reviewing, setReviewing] = useState(false);
  const { data: item, isLoading } = useResource('order_items', itemId)

  if (isLoading) {
    return <div className="margin-t-80 center-text">Loading Order...</div>
  }

  const { product } = item;

  const imageUrl = getImageUrl(product.images[0].image_url);

  const statusColor = statusColors(item.status);

  const isBuyer = viewerType === 'buyer';
  const isSeller = viewerType === 'store';
  const alreadyReviewed = !!item.current_user_review

  const toggleReviewing = () => {
    setReviewing(!reviewing)
  }

  return (
    <div className="order-item-details">
      <div className="flex row align-top">
        <Image radius={8} src={imageUrl} alt={product.name} style={{ width: "150px"}} fit="contain" />

        <div className="margin-left">
          <Title order={4}>{product.name}</Title>
          <Text size="sm" color="dimmed" className="italic margin-bottom">{product.productable_type}</Text>
          <Text size="sm" className="bold">{moneyDisplay(item.total_price_in_cents)}</Text>
          <Text size="sm" color="dimmed" className="margin-bottom">Quantity: {item.ordered_volume}</Text>
          <Badge style={{ textTransform: 'none' }} color={statusColor} variant="light">{orderStatusDisplayNames[item.status]}</Badge>

          <div className="flex row align-center margin-top">
            <Text size="sm">Sold by </Text>
            <Anchor
              href={`/stores/${item.store.id}`}
              className="bold margin-4-l"
              style={{ verticalAlign: 'middle', color: 'black' }}
              color="black"
              component="a"
            >
              {item.store.name}
            </Anchor>
          </div>
        </div>
      </div>

      <div>
        {item.fulfillment_method === "shipping" && <>
          <Title order={4} className="margin-right">Shipping Address</Title>
          <Text>{item.shipping_address}</Text>
        </>}

        <Title order={4} className="margin-top">Shipping Method</Title>
        <Text className="italic">{shippingOptionDisplayNames[item.shipping_option.shipping_type]}</Text>
      </div>

      {isSeller && <Select
        label="Update Order Status"
        placeholder="Select new status"
        data={orderStatusOptions}
        value={item.status}
        onChange={handleStatusSelect}
        w={300}
        className="margin-top double-margin-bottom"
      />}

      {reviewing && <ProductReviewForm product={product} onSuccess={toggleReviewing} />}

      {isBuyer &&
        <div>
          {alreadyReviewed ? (
            <div className="margin-top">
              <Title order={4}>Your Review</Title>

              <StarRatingDisplay rating={item.current_user_review.rating} size={22} />

              <Text className="italic">"{item.current_user_review.body}"</Text>
            </div>
            ) : (
              <Button variant="default" className="double-margin-top full-width" onClick={toggleReviewing}>
                { reviewing ? 'Cancel' : 'Add' } Review
                <ThemeIcon color="yellow" variant="transparent" >
                  <IconStarFilled size={16} />
                </ThemeIcon>
              </Button>
            )}
        </div>
      }
    </div>
  );
}

export default StoreOrderItemDetails;
