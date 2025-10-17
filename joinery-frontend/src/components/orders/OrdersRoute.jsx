import { ResourceProvider } from "../../context/ResourceContext.jsx";
import OrdersPage from "./OrdersPage.jsx";
import { useMe } from "../../hooks/useMe.js";

const OrdersRoute = () => {
  const { data: currentUser } = useMe();
  const store = currentUser && currentUser.current_store ? currentUser.current_store : null;

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <ResourceProvider initial={{ scopes: [{ name: 'by_user', args: [currentUser.id] }] }}>
      <OrdersPage currentUser={currentUser} store={store} />
    </ResourceProvider>
  );
}

export default OrdersRoute;