import { useState } from 'react';
import { Drawer, Select, Tabs, Text, Modal, Button } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";

import { useUpdateResource } from "../../hooks/useResourceMutations.js";
import { useResourceContext } from "../../context/ResourceContext.jsx";

import StoreOrderItemDetails from "../stores/StoreOrderItemDetails.jsx";
import OrdersTablePage from "./OrdersTablePage.jsx";
import { orderStatusOptions } from "../../utils/orderUtils.js";
import '../stores/Store.scss';
import './Order.scss'

// Named component OrdersPage but it is really OrderItems page
const OrdersPage = ({ currentUser, store }) => {
  const { setScopes } = useResourceContext();
  const { mutate: updateOrderItem } = useUpdateResource('order_items');

  const [detailsOpened, { open: openDetails, close: closeDetails }] = useDisclosure(false);
  const [orderModalOpened, { open: openOrderModal, close: closeOrderModal }] = useDisclosure(false);
  const [confirmOpened, { open: openConfirm, close: closeConfirm }] = useDisclosure(false);

  const [item, setItem] = useState(null);
  const [newStatus, setNewStatus] = useState(null);
  const [storeTabActive, setStoreTabActive] = useState(false);

  const onDrawerClose = () => {
    setItem(null);
    closeDetails();
  }

  const handleDetailsClose = () => {
    setItem(null);
    closeOrderModal();
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

  const handleOrderClick = (row) => {
    setItem(row.attributes);

    if (storeTabActive && (currentUser.current_store.id === row.attributes.store.id)) {
      openDetails();
    } else {
      openOrderModal();
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
          <OrdersTablePage onOrderClick={handleOrderClick} />
        </Tabs.Panel>
        {store && (
          <Tabs.Panel value="store-orders" pt="xs">
            <OrdersTablePage onOrderClick={handleOrderClick} />
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
              data={orderStatusOptions}
              value={item.status}
              onChange={handleStatusSelect}
              w={300}
              className="margin-top double-margin-bottom"
            />
          </>}
      </Drawer>

      <Modal opened={orderModalOpened} onClose={handleDetailsClose} title={<Text size="lg" className="bold">Order Details</Text>}>
        {item && <StoreOrderItemDetails item={item}/>}
      </Modal>

      <Modal opened={confirmOpened} onClose={handleCancelStatusChange} title={<Text size="lg" className="bold">Confirm Status Change</Text>}>
        <Text className="double-margin-bottom">Are you sure you want to change the status of Order Item {item?.id} to "{orderStatusOptions.find(option => option.value === newStatus)?.label}"?</Text>
        <div className="flex row space-between double-margin-top">
          <Button variant="subtle" color="gray" onClick={handleCancelStatusChange}>Cancel</Button>
          <Button variant="subtle" color="teal" onClick={() => handleStatusChange()}>Confirm</Button>
        </div>
      </Modal>
    </div>
  );
}

export default OrdersPage;