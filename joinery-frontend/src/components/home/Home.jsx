import { Button } from '@mantine/core'
import { NavLink } from 'react-router-dom';

import { useMe } from '../../hooks/useMe.js';
import { useAuth } from "../../context/AuthContext.jsx";
import useResources from '../../hooks/useResources.js';

const Home = () => {
  const { data: user, isLoading, isError, error } = useMe();
  const { data: products } = useResources({ resourceName: 'products', perPage: 5 });
  const { logout } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Featured Products</h2>
      <ul>
        {products?.map(product => (
          <li key={product.attributes.id}>
            {product.attributes.name} - ${(product.attributes.price_in_cents / 100).toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;