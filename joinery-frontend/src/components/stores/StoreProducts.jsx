import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Drawer, Text, Title } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";

import { useMe } from '../../hooks/useMe';
import useResourceData from '../../hooks/useResourceData';
import useResource from "../../hooks/useResource.js";

import ProductCard from "../products/ProductCard.jsx";
import StoreProduct from "./StoreProduct.jsx";
import ProductSkeletons from "../products/ProductSkeletons.jsx";
import JoinerySearch from "../ui/JoinerySearch.jsx";
import { IconPlus } from "@tabler/icons-react";

const StoreProducts = ({ storeId }) => {
  const { id } = useParams();
  const { data: user } = useMe();
  const { data: products, isLoading } = useResourceData('products');
  const { data: store } = useResource('stores', storeId || id);
  const [opened, { open, close }] = useDisclosure(false);
  const [product, setProduct] = useState(null);

  const isOwner = user && user.current_store?.id === parseInt(storeId || id);

  const onProductClick = (product) => {
    setProduct(product);
    open();
  }

  const storeProductText = isOwner ? "Your Products" : store.name + "'s Products";

  return (
    <div>
      <div className="flex row align-center double-padding-lr space-between">
        <Title order={2}>{storeProductText}</Title>

        {isOwner && <Button
          component={Link}
          to="/products/new"
          variant="outline"
          color="teal"
          disabled={!isOwner}
          rightSection={<IconPlus size={16} />}
        >
          Add New Product
        </Button>}
      </div>

      <div className="margin-top double-margin-bottom flex row to-center">
        <JoinerySearch searchLabel={`${store.name} products`} />
      </div>

      {products?.data?.length === 0 && !isLoading &&
        <div className="center-content margin-t-80"><p>No products found.</p></div>
      }

      { isLoading && <ProductSkeletons /> }

      <div className="product-list">
        <div className="product-grid">
          {products && products?.data?.map(product => (
            <div key={product.id} className="product-card-wrapper" onClick={isOwner ? open : null}>
              <ProductCard key={product.id} cardData={product.attributes} clickable={false} />

              {isOwner && <Button onClick={() => onProductClick(product.attributes)} disabled={!isOwner} variant="outline" color="black" fullWidth mt="xs">
                Manage Product
              </Button>}
            </div>
          ))}
        </div>
      </div>

      {isOwner && product && (
        <Drawer
          opened={opened}
          onClose={close}
          title={`Manage ${product.name}`}
          position="right"
          size="lg"
        >
          <StoreProduct close={close} product={product} />
        </Drawer>
      )}
    </div>
  );
}

export default StoreProducts;