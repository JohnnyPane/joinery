import { useState } from "react";
import { Tabs, Drawer, Title, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useResourceContext } from "../../context/ResourceContext.jsx";
import useResourceData from "../../hooks/useResourceData.js";
import JoineryTablePage from "../ui/JoineryTablePage.jsx";
import QuoteDrawerDetails from "./QuoteDrawerDetails.jsx";

const quoteTableColumns = [
  { header: 'ID', accessor: 'id', type: 'text' },
  { header: 'Product', accessor: 'product.name', type: 'text' },
  { header: 'Status', accessor: 'status', type: 'badge' },
  { header: 'Action Needed', accessor: 'requires_action', type: 'boolean' },
  { header: 'Message', accessor: 'latest_quote.message', type: 'text' },
  { header: 'Last Updated', accessor: 'latest_quote.updated_at', type: 'date' }
];


const MyQuotes = ({ user, store }) => {
  const { data: quotes, isLoading, isError } = useResourceData('quote_requests');
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

  const handleRowClick = (quote) => {
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
          <JoineryTablePage onRowClick={handleRowClick} resourceData={quotes} columns={quoteTableColumns} resourceName={'quote_requests'} />
        </Tabs.Panel>
        {store && (
          <Tabs.Panel value="store-quotes" pt="xs">
            <JoineryTablePage onRowClick={handleRowClick} resourceData={quotes} columns={quoteTableColumns} resourceName={'quote_requests'} />
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