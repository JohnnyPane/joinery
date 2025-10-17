import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Drawer, Select, Tabs, Text, Modal, Button } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";

import useResourceData from "../../hooks/useResourceData.js";
import { useUpdateResource } from "../../hooks/useResourceMutations.js";
import { useResourceContext } from "../../context/ResourceContext.jsx";

import JoineryTablePage from "../ui/JoineryTablePage.jsx";
import StoreOrderItemDetails from "../store/StoreOrderItemDetails.jsx";

import { orderShippingStatuses, shippingOptionDisplayNames } from "../../utils/shippingConfigs.js";
import '../store/Store.scss';

const orderItemTableColumns = [
  { header: 'ID', accessor: 'id', type: 'text' },
  { header: 'Product', accessor: 'product.name', type: 'text' },
  { header: 'Status', accessor: 'status', type: 'badge', textMapping: orderShippingStatuses },
  { header: 'Action Needed', accessor: 'requires_action', type: 'boolean' },
  { header: 'Shipping Method', accessor: 'shipping_option.shipping_type', type: 'text', textMapping: shippingOptionDisplayNames },
];

const statusOptions = [
  { value: 'awaiting_fulfillment', label: 'Awaiting Fulfillment' },
  { value: 'awaiting_pickup', label: 'Awaiting Pickup' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'complete', label: 'Complete' },
  { value: 'cancelled', label: 'Cancelled' },
];

// Named component OrdersPage but it is really OrderItems page
const OrdersPage = ({ currentUser, store }) => {
  const { setScopes } = useResourceContext();

  const navigate = useNavigate();
  const { data: orders, isLoading, isError } = useResourceData('order_items');
  const { mutate: updateOrderItem } = useUpdateResource('order_items');
  const [detailsOpened, { open: openDetails, close: closeDetails }] = useDisclosure(false);
  const [confirmOpened, { open: openConfirm, close: closeConfirm }] = useDisclosure(false);
  const [item, setItem] = useState(null);
  const [newStatus, setNewStatus] = useState(null);
  const [storeTabActive, setStoreTabActive] = useState(false);

  const onModalOpen = (orderItem) => {
    setItem(orderItem);
    openDetails();
  }

  const onDrawerClose = () => {
    setItem(null);
    closeDetails();
  }

  const handleStatusSelect = (value) => {
    setNewStatus(value);
    openConfirm();
  }

  const handleStatusChange = async () => {
    try {
      await updateOrderItem({ id: item.id, status: newStatus });
      const updatedItem = { ...item, status: newStatus };
      setItem(updatedItem);
      closeConfirm();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  }

  const handleCancelStatusChange = () => {
    setNewStatus(null);
    closeConfirm();
  }

  const handleRowClick = (row) => {
    if (storeTabActive) {
      if (currentUser.current_store.id !== row.attributes.store.id) {
        return;
      }

      setItem(row.attributes);
      openDetails();
    }
  }

  const handleTabChange = (value) => {
    if (value === 'my-orders') {
      setScopes([{ name: "by_user", args: [currentUser.id] }]);
      setStoreTabActive(false)
    } else if (value === 'store-orders' && store) {
      setScopes([{ name: "by_store", args: [store.id] }]);
      setStoreTabActive(true)
    }
  }

  return (
    <div className="page">
      <Tabs onChange={handleTabChange} defaultValue={"my-orders"} className="margin-top">
        <Tabs.List className="margin-bottom">
          <Tabs.Tab value="my-orders"><Text className="bold" size="md">My Orders</Text></Tabs.Tab>
          {store && <Tabs.Tab value="store-orders"><Text className="bold" size="md">Store Orders</Text></Tabs.Tab>}
        </Tabs.List>
        <Tabs.Panel value="my-orders" pt="xs">
          <JoineryTablePage onRowClick={handleRowClick} resourceData={orders} columns={orderItemTableColumns} resourceName={'order_items'} />
        </Tabs.Panel>
        {store && (
          <Tabs.Panel value="store-orders" pt="xs">
            <JoineryTablePage onRowClick={handleRowClick} resourceData={orders} columns={orderItemTableColumns} resourceName={'order_items'} />
          </Tabs.Panel>
        )}
      </Tabs>

      <Drawer opened={detailsOpened} position="right" onClose={onDrawerClose} title={`Order ${item?.id} Details`}>
        {item &&
          <>
            <StoreOrderItemDetails item={item}/>
            <Select
              label="Update Order Status"
              placeholder="Select new status"
              data={statusOptions}
              value={item.status}
              onChange={handleStatusSelect}
              w={300}
              className="margin-top double-margin-bottom"
            />
          </>}
      </Drawer>

      <Modal opened={confirmOpened} onClose={handleCancelStatusChange} title={<Text size="lg" className="bold">Confirm Status Change</Text>}>
        <Text className="double-margin-bottom">Are you sure you want to change the status of Order Item {item?.id} to "{statusOptions.find(option => option.value === newStatus)?.label}"?</Text>
        <div className="flex row space-between double-margin-top">
          <Button variant="subtle" color="gray" onClick={handleCancelStatusChange}>Cancel</Button>
          <Button variant="subtle" color="teal" onClick={() => handleStatusChange()}>Confirm</Button>
        </div>
      </Modal>
    </div>
  );
}

export default OrdersPage;