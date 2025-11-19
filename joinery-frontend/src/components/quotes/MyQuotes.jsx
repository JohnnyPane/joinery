import { useState } from "react";
import { Tabs, Drawer, Text } from "@mantine/core";
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

  return (
    <div className="page">
      <Tabs onChange={handleTabChange} defaultValue={"my-quotes"} className="margin-top">
        <Tabs.List className="margin-bottom">
          <Tabs.Tab value="my-quotes"><Text className="bold" size="md">My Requests</Text></Tabs.Tab>
          {store && <Tabs.Tab value="store-quotes"><Text className="bold" size="md">Store Requests</Text></Tabs.Tab>}
        </Tabs.List>
        <Tabs.Panel value="my-quotes" pt="xs">
          <QuotesTablePage onQuoteClick={handleQuoteClick} />
        </Tabs.Panel>
        {store && (
          <Tabs.Panel value="store-quotes" pt="xs">
            <QuotesTablePage onQuoteClick={handleQuoteClick} />
          </Tabs.Panel>
        )}
      </Tabs>

      <Drawer
        opened={drawerOpened}
        onClose={onDrawerClose}
        title={<Text size="lg" className="bold">{selectedQuote ? `Quote Request #${selectedQuote.id}` : 'Quote Request'}</Text>}
        position="right"
        padding="xl"
        size="lg"
      >
        {selectedQuote && <QuoteDrawerDetails quote={selectedQuote.attributes} closeDrawer={onDrawerClose} />}
      </Drawer>
    </div>
  );
}

export default MyQuotes;