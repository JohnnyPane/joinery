import { useMe } from "../../hooks/useMe.js";
import useResources from '../../hooks/useResources.js';
import ProductCard from "../products/ProductCard.jsx";
import '../products/Product.scss';

const Home = () => {
  const { data: user } = useMe();
  const { data: products } = useResources({ resourceName: 'products', perPage: 5, extraParams: { image_type: 'small'} });

  return (
      <div className="product-list">
        <div className="product-grid">
        {products && products.map(product => (
          <ProductCard key={product.id} cardData={product.attributes} />
        ))}
      </div>
    </div>
  );
}

export default Home;