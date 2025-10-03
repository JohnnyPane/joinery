import { useParams } from 'react-router-dom'
import { Accordion } from '@mantine/core'
import './Product.scss'

import { productTypeDisplayName } from "../../utils/productConfigs.js"
import { moneyDisplay } from '../../utils/humanizeText.js'
import useResource from '../../hooks/useResource.js'
import JoineryImageCarousel from "../ui/JoineryImageCarousel.jsx"
import ProductDetails from './ProductDetails.jsx'

const Product = () => {
  const { id } = useParams();
  const { data: product, isLoading, isError, error } = useResource('products', id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-image-carousel">
        <JoineryImageCarousel images={product.images} height={600} />
      </div>

      <div className="product-info">
        <h1 className="header-1">{product.name}</h1>
        <p className="sub-header-1">{productTypeDisplayName[product.productable_type]}</p>
        <Accordion defaultValue="description">
          <Accordion.Item key="description" value="description">
            <Accordion.Control value="description" className="accordion-panel-header">Description</Accordion.Control>
            <Accordion.Panel className="product-detail-description">{product.description}</Accordion.Panel>
          </Accordion.Item>

          <ProductDetails product={product} />
        </Accordion>

        <div className="product-detail-price">
          <span className="label-large padding-left">{moneyDisplay(product.price_in_cents)}</span>
        </div>

      </div>
    </div>
  );
}

export default Product;
