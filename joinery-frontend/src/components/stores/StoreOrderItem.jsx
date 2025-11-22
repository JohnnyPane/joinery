import { Card, Button } from "@mantine/core";
import StoreOrderItemDetails from "./StoreOrderItemDetails.jsx";

const StoreOrderItem = ({ item, openDetails }) => {

  return (
    <div className="margin-left store-order-item">
      <Card shadow="sm" padding="lg" radius="md" withBorder className="store-order-item">
        <StoreOrderItemDetails itemId={itemId} />
        <Button color="indigo" variant="subtle" className="double-margin-top full-width" onClick={() => openDetails(item)}>Update Order Details</Button>
      </Card>
    </div>
  );
}

export default StoreOrderItem;
