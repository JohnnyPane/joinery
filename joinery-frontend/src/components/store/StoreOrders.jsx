import { useParams, useNavigate } from "react-router-dom";
import { Grid } from '@mantine/core';

import useResources from '../../hooks/useResources';
import { useUpdateResource } from "../../hooks/useResourceMutations.js";
import { useMe } from '../../hooks/useMe';
import StoreOrderItem from "./StoreOrderItem.jsx";
import './Store.scss';

// Named component StoreOrders but it is really StoreOrderItems
const StoreOrders = () => {
  const { data: currentUser } = useMe();

  const { id: storeId } = useParams();
  const navigate = useNavigate();
  const { data: orders, isLoading, isError } = useResources({ resourceName: 'order_items', scopes: [{ name: 'by_store', args: storeId }] });
  const { mutate: updateOrderItem } = useUpdateResource('order_item');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  if (storeId && currentUser.current_store.id !== parseInt(storeId, 10)) {
    navigate('/');
    return null;
  }

  const orderItems = orders.data;

  return (
    <div>
      <h3 className="margin-left">Store Orders</h3>
      <Grid>
        {orderItems.map(orderItem => (
          <Grid.Col span={4} key={orderItem.id}>
            <StoreOrderItem item={orderItem.attributes} updateOrderItem={updateOrderItem} />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}

export default StoreOrders;