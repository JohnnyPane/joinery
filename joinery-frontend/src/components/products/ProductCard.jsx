import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Image, Text, Title } from "@mantine/core";

import { moneyDisplay } from "../../utils/humanizeText.js";
import { productTypeDisplayName } from "../../utils/productConfigs.js";
import { getImageUrl } from "../../utils/imageConfigs.js";

const ProductCard = ({ cardData, clickable = true }) => {
  const { images, name, productable_type, price_per_unit_in_cents, store } = cardData;
  const firstImageUrl = images.length > 0 ? images[0]?.image_url : "";
  const [displayImageUrl, setDisplayImageUrl] = useState(firstImageUrl);

  const navigate = useNavigate();

  const productTypeText = productTypeDisplayName[productable_type] || "";
  const handleCardClick = () => {
    if (clickable) {
      navigate(`/products/${cardData.id}`);
    }
  }

  const imageUrl = getImageUrl(firstImageUrl)

  // const handleCardEnter = () => {
  //   if (images.length > 1) {
  //     setDisplayImageUrl(images[1]?.image_url);
  //   }
  // }
  //
  // const handleCardLeave = () => {
  //   if (images.length > 0) {
  //     setDisplayImageUrl(images[0]?.image_url);
  //   }
  // }

  const priceDisplay = cardData.requestable ? "Request a Quote" : moneyDisplay(price_per_unit_in_cents);

  return (
    <div className="clickable product-card" onClick={handleCardClick}>
      <div className="product-card-image-container">
        <Image
          src={imageUrl}
          alt={name}
          className="product-card-image margin-4-b"
          fallbackSrc={`https://placehold.co/600?text=(image not available)&font=Lora`}
        />
      </div>

      <div className="flex row align-center space-between">
        <Title order={6} className="text-truncate" title={name}>{name}</Title>
        <Text size="sm" className="italic no-wrap">{productTypeText}</Text>
      </div>

      <Text size="xs" color="dimmed">{store.name}</Text>

      <Text className="bold">{priceDisplay}</Text>
    </div>
  );
}

export default ProductCard;
