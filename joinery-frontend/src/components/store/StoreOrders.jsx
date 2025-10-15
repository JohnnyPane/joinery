import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Grid, Modal, Select } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";

import useResourceData from "../../hooks/useResourceData.js";
import { useUpdateResource } from "../../hooks/useResourceMutations.js";
import { useMe } from '../../hooks/useMe';
import StoreOrderItem from "./StoreOrderItem.jsx";
import StoreOrderItemDetails from "./StoreOrderItemDetails.jsx";
import './Store.scss';
import ProductSkeletons from "../products/ProductSkeletons.jsx";

const statusOptions = [
  { value: 'awaiting_fulfillment', label: 'Awaiting Fulfillment' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'complete', label: 'Complete' },
  { value: 'canceled', label: 'Canceled' },
];


// Named component StoreOrders but it is really StoreOrderItems
const StoreOrders = ({ storeId }) => {
  const { data: currentUser } = useMe();

  const navigate = useNavigate();
  const { data: orders, isLoading, isError } = useResourceData('order_items');
  const { mutate: updateOrderItem } = useUpdateResource('order_items');
  const [detailsOpened, { open: openDetails, close: closeDetails }] = useDisclosure(false);
  const [item, setItem] = useState(null);

  const onModalOpen = (orderItem) => {
    setItem(orderItem);
    openDetails();
  }

  const onModalClose = () => {
    setItem(null);
    closeDetails();
  }

  const handleStatusChange = async (newStatus) => {
    try {
      await updateOrderItem({ id: item.id, status: newStatus });
      const updatedItem = { ...item, status: newStatus };
      setItem(updatedItem);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  }

  if (isLoading) {
    return <div className="page"><ProductSkeletons /></div>;
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
    <div className="page">
      <h3 className="margin-left">Store Orders</h3>

      {orderItems.length === 0 ? (
        <div className="center-content margin-t-80">
          <p>No orders have been placed yet.</p>
        </div>
      ) : null}

      <Grid>
        {orderItems.map(orderItem => (
          <Grid.Col span={4} key={orderItem.id}>
            <StoreOrderItem item={orderItem.attributes} updateOrderItem={updateOrderItem} openDetails={onModalOpen} />
          </Grid.Col>
        ))}
      </Grid>

      {item && <Modal opened={detailsOpened} onClose={onModalClose} title={`Order ${item.id} Details`} size="lg">
        <StoreOrderItemDetails item={item}/>
        <Select
          label="Update Status"
          placeholder="Select new status"
          data={statusOptions}
          value={item.status}
          onChange={handleStatusChange}
          w={300}
          className="margin-top double-margin-bottom"
        />
      </Modal>}
    </div>
  );
}

export default StoreOrders;