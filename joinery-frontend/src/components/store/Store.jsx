import { useParams } from 'react-router-dom';
import useResource from '../../hooks/useResource';
import StoreProducts from "./StoreProducts.jsx";
import CreateStoreStripeAccount from "./CreateStoreStripeAccount.jsx";

const Store = () => {
  const { id } = useParams();
  const { data: store, isLoading, isError, error } = useResource('stores', id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!store.stripe_account_id) {
    return <CreateStoreStripeAccount />
  }

  if (!store.charges_enabled) {
    return <div>Your store is not fully set up to receive payments. Please complete the Stripe onboarding process.</div>;
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