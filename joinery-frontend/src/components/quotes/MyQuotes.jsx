import { useState } from "react";
import { Tabs, Drawer, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useResourceContext } from "../../context/ResourceContext.jsx";
import QuoteDrawerDetails from "./QuoteDrawerDetails.jsx";
import QuotesTablePage from "./QuotesTablePage.jsx";

const MyQuotes = ({ user, store }) => {
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const { setScopes } = useResourceContext();

  const handleTabChange = (value) => {
    if (value === 'my-quotes') {
      setScopes([{ name: "for_buyer", args: [user.id] }]);
    } else if (value === 'store-quotes' && store) {
      setScopes([{ name: "for_seller", args: [store.id] }]);
    }
  }

  const handleQuoteClick = (quote) => {
    setSelectedQuote(quote);
    openDrawer();
  }

  const onDrawerClose = () => {
    setSelectedQuote(null);
    closeDrawer();
  }

  const defaultTab = store ? "store-quotes" : "my-quotes";

  return (
    <div className="page">
      <Title className="center-text" order={2}>My Quotes</Title>
      <Tabs onChange={handleTabChange} defaultValue={defaultTab} className="margin-top">

        <Tabs.List className="margin-bottom">
          {store && <Tabs.Tab value="store-quotes"><Text className="bold" size="md">Store Requests</Text></Tabs.Tab>}
          <Tabs.Tab value="my-quotes"><Text className="bold" size="md">My Requests</Text></Tabs.Tab>
        </Tabs.List>

        <QuotesTablePage onQuoteClick={handleQuoteClick} />
      </Tabs>

      <Drawer
        opened={drawerOpened}
        onClose={onDrawerClose}
        title={<Text size="lg" className="bold">{selectedQuote ? `Quote Request #${selectedQuote.id}` : 'Quote Request'}</Text>}
        position="right"
        padding="lg"
        size="lg"
      >
        {selectedQuote && <QuoteDrawerDetails quote={selectedQuote.attributes} closeDrawer={onDrawerClose} />}
      </Drawer>
    </div>
  );
}

export default MyQuotes;