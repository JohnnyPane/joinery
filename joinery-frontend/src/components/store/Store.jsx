import { useParams } from 'react-router-dom';
import { Text, Title } from '@mantine/core';
import useResource from '../../hooks/useResource';
import StoreProducts from "./StoreProducts.jsx";
import { ResourceProvider } from "../../context/ResourceContext.jsx";
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
    <div className="page">
      <div className="double-padding-lr double-margin-bottom">
        <Title order={2} className="margin-none">{store.name}</Title>
        <Text color="dimmed">{store.description}</Text>
        <Text size="xs">{store.location}</Text>

      </div>

      <ResourceProvider>
        <StoreProducts storeId={id} />
      </ResourceProvider>
    </div>
  );
}

export default Store;