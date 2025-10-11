import { Card, Select, Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import StoreOrderItemDetails from "./StoreOrderItemDetails.jsx";

const statusOptions = [
  { value: 'awaiting_fulfillment', label: 'Awaiting Fulfillment' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'complete', label: 'Complete' },
  { value: 'canceled', label: 'Canceled' },
];

const StoreOrderItem = ({ item, updateOrderItem }) => {
  const [detailsOpened, { open: openDetails, close: closeDetails }] = useDisclosure(false);

  const handleStatusChange = async (newStatus) => {
    try {
      await updateOrderItem({id: item.id, status: newStatus });
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  }

  return (
    <div className="margin-left store-order-item">
      <Card shadow="sm" padding="lg" radius="md" withBorder className="store-order-item">
        <StoreOrderItemDetails item={item} />
        <Button color="blue" className="double-margin-top full-width" onClick={openDetails}>Update Order Details</Button>
      </Card>


      <Modal opened={detailsOpened} onClose={closeDetails} title={`Order ${item.id} Details`} size="lg">
        <StoreOrderItemDetails item={item} />
        <Select
          label="Update Status"
          placeholder="Select new status"
          data={statusOptions}
          value={item.status}
          onChange={handleStatusChange}
          className="margin-top"
        />
      </Modal>
    </div>
  );
}

export default StoreOrderItem;
