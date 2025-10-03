import { useParams } from 'react-router-dom';
import useResource from '../../hooks/useResource';
import StoreProducts from "./StoreProducts.jsx";

const Store = () => {
  const { id } = useParams();
  const { data: store, isLoading, isError, error } = useResource('stores', id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>{store.name}</h2>
      <p>{store.description}</p>
      <p>Location: {store.location}</p>

      <StoreProducts storeId={id} />
    </div>
  );
}

export default Store;