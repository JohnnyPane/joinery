import { useParams } from 'react-router-dom';
import { Text, Title, Button, Tabs } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";

import useResource from '../../hooks/useResource';
import { useMe } from '../../hooks/useMe';
import StoreProducts from "./StoreProducts.jsx";
import { ResourceProvider } from "../../context/ResourceContext.jsx";
import CreateStoreStripeAccount from "./CreateStoreStripeAccount.jsx";
import StoreLogo from "./StoreLogo.jsx";
import AddLogoDrawer from "./AddLogoDrawer.jsx";
import { getImageUrl } from "../../utils/imageConfigs.js";
import EditStoreInfo from "./EditStoreInfo.jsx";
import JoineryPagination from "../ui/JoineryPagination.jsx";

const Store = () => {
  const { id } = useParams();
  const { data: user } = useMe();
  const { data: store, isLoading, isError, error } = useResource('stores', id);
  const [isLogoDrawerOpen, { open: openLogoDrawer, close: closeLogoDrawer }] = useDisclosure(false);
  const [editStoreDrawerOpen, { open: openEditStoreDrawer, close: closeEditStoreDrawer }] = useDisclosure(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const isOwner = user && user.current_store?.id === store.id;

  if (!store.stripe_account_id && isOwner) {
    return <CreateStoreStripeAccount />
  }

  if (!store.charges_enabled && isOwner) {
    return <div className="margin-t-80 center-content">Your store is not fully set up to receive payments. Please complete the Stripe onboarding process.</div>;
  }

  const logoUrl = store.logo_url ? getImageUrl(store.logo_url.image_url) : null;

  return (
    <div className="page">
      <div className="double-padding-lr double-margin-bottom">
        <div className="flex row ">

          <div className="flex column to-center">
            <StoreLogo imageUrl={logoUrl} size={120} />

            {isOwner && <Button variant="subtle" color="blue" size="compact-xs" radius="xl" className="margin-4-t"
                     onClick={openLogoDrawer}>
              {store.logo_url ? 'Change Logo' : 'Add Logo'}
            </Button>}
          </div>

          <div className="double-margin-left">
            <div className="flex row align-center">
              <Title order={2}>{store.name}</Title>

              {isOwner &&
                <Button variant="outline" color="blue" size="compact-xs" className="double-margin-left"
                        onClick={openEditStoreDrawer}>
                  Edit Store Info
                </Button>}
            </div>
            {/*<Text color="dimmed">{store.description}</Text>*/}
            <Text size="sm" color="dimmed">{store.location}</Text>
          </div>
        </div>
      </div>

      <Tabs defaultValue="products" className="double-margin-bottom">
        <Tabs.List className="margin-bottom">
          <Tabs.Tab value="products"><Text className="bold">Products</Text></Tabs.Tab>
          <Tabs.Tab value="about"><Text className="bold">About</Text></Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="products">
          <ResourceProvider resourceName="products" initial={{ scopes: [{ name: 'by_store', args: [id] }, { name: 'in_stock' }] }} >
            <StoreProducts storeId={id} />

            <JoineryPagination resourceName="products" />
          </ResourceProvider>
        </Tabs.Panel>

        <Tabs.Panel value="about">
          <div className="padding-lr">
            <Title order={3} className="margin-bottom">About {store.name}</Title>
            <Text>{store.description || "No additional information provided about this store."}</Text>
          </div>
        </Tabs.Panel>
      </Tabs>

      {isOwner && <div>
        <AddLogoDrawer storeId={id} isOpen={isLogoDrawerOpen} onClose={closeLogoDrawer}/>
        <EditStoreInfo storeId={id} open={editStoreDrawerOpen} onClose={closeEditStoreDrawer}/>
      </div>}
    </div>
  );
}

export default Store;