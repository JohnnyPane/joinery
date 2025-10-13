import { useParams } from "react-router-dom";
import { ResourceProvider } from "../../context/ResourceContext.jsx";
import StoreOrders from "./StoreOrders.jsx";

const StoreOrdersRoute = () => {
  const { id: storeId } = useParams();

  return (
    <ResourceProvider initial={{ scopes: [{ name: 'by_store', args: storeId }] }}>
      <StoreOrders storeId={storeId} />
    </ResourceProvider>
  );
}

export default StoreOrdersRoute;