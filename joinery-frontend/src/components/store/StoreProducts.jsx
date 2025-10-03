import { useParams, Link } from "react-router-dom";
import { Button } from '@mantine/core';

import { useMe } from '../../hooks/useMe';
import useResources from '../../hooks/useResources';
import ProductCard from "../products/ProductCard.jsx";

const StoreProducts = ({ storeId }) => {
  const { id } = useParams();
  const { data: user } = useMe();
  const { data: products, isLoading, isError, error } = useResources( { resourceName: 'products', scopes: [{ name: 'by_store', args: storeId || id }] });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const isOwner = user && user.current_store?.id === parseInt(storeId || id);

  return (
    <div>
      <h3>Products</h3>

      {isOwner && <Button component={Link} to="/products/new" variant="outline" mb="md" disabled={!isOwner}>
        Add New Product
      </Button>}

      {products.length === 0 ? (
        <p></p>
      ) : (
        <div className="product-list">
          <div className="product-grid">
            {products && products.map(product => (
              <ProductCard key={product.id} cardData={product.attributes} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default StoreProducts;