import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Image } from "@mantine/core";

import { moneyDisplay } from "../../utils/humanizeText.js";
import { productTypeDisplayName } from "../../utils/productConfigs.js";

const rootURL = import.meta.env.VITE_API_ROOT_URL;

const ProductCard = ({ cardData }) => {
  const { images, name, productable_type, price_in_cents } = cardData;
  const firstImageUrl = images.length > 0 ? images[0]?.image_url : "";
  const [displayImageUrl, setDisplayImageUrl] = useState(firstImageUrl);

  const navigate = useNavigate();

  const productTypeText = productTypeDisplayName[productable_type] || "";
  const handleCardClick = () => {
    navigate(`/products/${cardData.id}`);
  }

  const handleCardEnter = () => {
    if (images.length > 1) {
      setDisplayImageUrl(images[1]?.image_url);
    }
  }

  const handleCardLeave = () => {
    if (images.length > 0) {
      setDisplayImageUrl(images[0]?.image_url);
    }
  }

  return (
    <div className="clickable" onClick={handleCardClick}>
      <div onMouseEnter={handleCardEnter} onMouseLeave={handleCardLeave}>
        <Image
          src={rootURL + displayImageUrl}
          alt={name}
          className="product-image margin-bottom"
        />
      </div>

      <div className="flex row space-between">
        <span>{name}</span>
        <span className="bold">{moneyDisplay(price_in_cents)}</span>
      </div>

      <div className="italic saddle-brown">{productTypeText}</div>
    </div>
  );
}

export default ProductCard;
