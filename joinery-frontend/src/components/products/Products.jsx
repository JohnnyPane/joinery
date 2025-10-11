import ProductCard from "./ProductCard.jsx";
import useResourceData from "../../hooks/useResourceData.js";
import '../products/Product.scss';

const Products = () => {
  const { data: products, isLoading } = useResourceData('products');

  if (isLoading) return <div className="loading">Loading products...</div>;

  return (
    <div className="product-list">
      <div className="product-grid">
        {products && products.data.map(product => (
          <ProductCard key={product.id} cardData={product.attributes} />
        ))}
      </div>
    </div>
  );
}

export default Products;