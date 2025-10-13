import ProductCard from "./ProductCard.jsx";
import useResourceData from "../../hooks/useResourceData.js";
import '../products/Product.scss';
import ProductSkeletons from "./ProductSkeletons.jsx";

const Products = () => {
  const { data: products, isLoading } = useResourceData('products');

  if (isLoading) return <ProductSkeletons count={8} />;

  if (!products || products.data.length === 0) return <div className="center-content margin-t-80">No products found.</div>;

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