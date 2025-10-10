import { useMe } from "../../hooks/useMe.js";
import useResources from '../../hooks/useResources.js';
import ProductCard from "../products/ProductCard.jsx";
import '../products/Product.scss';

const Home = () => {
  const { data: user } = useMe();
  const { data: products, isLoading } = useResources({ resourceName: 'products', perPage: 5, extraParams: { image_type: 'small'} });

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

export default Home;