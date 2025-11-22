import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Image, Text } from "@mantine/core";

import { moneyDisplay } from "../../utils/humanizeText.js";
import { productTypeDisplayName } from "../../utils/productConfigs.js";

const rootURL = import.meta.env.VITE_API_ROOT_URL;

const ProductCard = ({ cardData, clickable = true }) => {
  const { images, name, productable_type, price_in_cents } = cardData;
  const firstImageUrl = images.length > 0 ? images[0]?.image_url : "";
  const [displayImageUrl, setDisplayImageUrl] = useState(firstImageUrl);

  const navigate = useNavigate();

  const productTypeText = productTypeDisplayName[productable_type] || "";
  const handleCardClick = () => {
    if (clickable) {
      navigate(`/products/${cardData.id}`);
    }
  }

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

  const priceDisplay = cardData.requestable ? "Request a Quote" : moneyDisplay(price_in_cents);

  return (
    <div className="clickable product-card" onClick={handleCardClick}>
      <div className="product-card-image-container">
        <Image
          src={rootURL + displayImageUrl}
          alt={name}
          className="product-card-image margin-4-b"
        />
      </div>

      <div className="flex row align-bottom space-between">
        <Text size="sm" className="text-truncate" title={name}>{name}</Text>
        <Text color="dimmed" size="sm" className="italic">{productTypeText}</Text>
      </div>

      <Text className="bold">{priceDisplay}</Text>
    </div>
  );
}

export default ProductCard;
