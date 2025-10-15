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

  return (
    <ResourceProvider initial={{ scopes: [{ name: "for_buyer", args: [currentUser.id] }]} }>
      <MyQuotes store={currentStore} user={currentUser} />
    </ResourceProvider >
  );
}

export default Quotes;