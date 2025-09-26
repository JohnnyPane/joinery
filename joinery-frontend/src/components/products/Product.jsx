import { useParams } from 'react-router-dom'
import useResource from '../../hooks/useResource.js'

const Product = () => {
  const { id } = useParams();
  const { data: product, isLoading, isError, error } = useResource('products', id, { include: 'productable,cart_image_urls' });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: {product.price_in_cents / 100}</p>
      <p>Type: {product.productable_type}</p>
      {/* Add more product details as needed */}
    </div>
  );
}

export default Product;
