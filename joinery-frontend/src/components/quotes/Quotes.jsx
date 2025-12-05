import { useMe } from "../../hooks/useMe";
import { ResourceProvider } from "../../context/ResourceContext.jsx";
import MyQuotes from "./MyQuotes.jsx";
import './Quote.scss'

const Quotes = () => {
  const { data: currentUser } = useMe();
  const currentStore = currentUser?.current_store;

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const initialScopeName = currentStore ? "for_seller" : "for_buyer";
  const initialScopeArgs = currentStore ? [currentStore.id] : [currentUser.id];

  return (
    <ResourceProvider initial={{ scopes: [{ name: initialScopeName, args: initialScopeArgs }]} }>
      <MyQuotes store={currentStore} user={currentUser} />
    </ResourceProvider >
  );
}

export default Quotes;