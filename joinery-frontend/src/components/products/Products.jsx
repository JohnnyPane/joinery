import { Text } from '@mantine/core';
import ProductCard from "./ProductCard.jsx";
import useResourceData from "../../hooks/useResourceData.js";
import '../products/Product.scss';
import ProductSkeletons from "./ProductSkeletons.jsx";

const Products = () => {
  const { data: products, isLoading, total, perPage } = useResourceData('products');

  if (isLoading) return <ProductSkeletons count={perPage} />;

  if (!products || products.data.length === 0) return <div className="center-content margin-t-80 no-products">No products found.</div>;

  return (
    <div className="product-list">
      <Text size="xs" color="dimmed" className="product-count">Total Products: {total}</Text>

      <div className="product-grid">
        {products && products.data.map(product => (
          <ProductCard key={product.id} cardData={product.attributes} />
        ))}
      </div>
    </div>
  );
}

export default Products;