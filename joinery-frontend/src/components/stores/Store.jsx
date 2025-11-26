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
import StarRatingDisplay from "../ui/StarRatingDisplay.jsx";
import StoreReviews from "../reviews/StoreReviews.jsx"

const Store = () => {
  const { id } = useParams();
  const { data: user } = useMe();
  const { data: store, isLoading, isError, error } = useResource('stores', id);
  const [isLogoDrawerOpen, { open: openLogoDrawer, close: closeLogoDrawer }] = useDisclosure(false);
  const [editStoreDrawerOpen, { open: openEditStoreDrawer, close: closeEditStoreDrawer }] = useDisclosure(false);

  if (!store) {
    return <div>Loading...</div>;
  }

  const isOwner = user && user.current_store?.id === store.id;

  if (!store.stripe_account_id && isOwner) {
    return <CreateStoreStripeAccount />
  }

  if (!store.charges_enabled && isOwner) {
    return <div className="margin-t-80 center-content">Your store is not fully set up to receive payments. Please complete the Stripe onboarding process.</div>;
  }

  const logoUrl = store.logo_url ? getImageUrl(store.logo_url.image_url) : null;

  const productScopes = isOwner ? [{ name: 'by_store', args: [id] }] : [{ name: 'by_store', args: [id] }, { name: 'in_stock' }]

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
              <Title order={2}>{store.name}</Title>

            <Text color="dimmed" className="margin-bottom" size="sm">{store.description}</Text>
            {/*<Text size="sm" color="dimmed">{store.location}</Text>*/}

            {/*StarRatingDisplay({ rating, review_count = 0, size = 16, displayType = 'full', showCount = false })*/}
            <StarRatingDisplay
              rating={store.overall_average_rating}
              review_count={store.combined_reviews_count}
              displayType="single"
              showCount={true}
              size={22}
            />

            {isOwner &&
              <Button variant="outline" color="blue" size="compact-xs"
                      onClick={openEditStoreDrawer}>
                Edit Store Info
              </Button>}
          </div>
        </div>
      </div>

      <Tabs defaultValue="products" className="double-margin-bottom" keepMounted={false}>
        <Tabs.List className="margin-bottom">
          <Tabs.Tab value="products"><Text className="bold">Products</Text></Tabs.Tab>
          <Tabs.Tab value="reviews"><Text className="bold">Reviews</Text></Tabs.Tab>
          <Tabs.Tab value="about"><Text className="bold">About</Text></Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="products">
          <ResourceProvider resourceName="products" initial={{ searchColumn: 'name', scopes: productScopes }} >
            <StoreProducts storeId={id} />

            <JoineryPagination resourceName="products" />
          </ResourceProvider>
        </Tabs.Panel>

        <Tabs.Panel value="reviews">
          <ResourceProvider resourceName="reviews" initial={{ scopes: [{ name: 'for_store', args: [id] }] }} >
            <StoreReviews storeId={id} />

            <JoineryPagination resourceName="reviews" />
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