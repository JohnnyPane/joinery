import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Drawer, Text } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";

import { useMe } from '../../hooks/useMe';
import useResourceData from '../../hooks/useResourceData';
import useResource from "../../hooks/useResource.js";

import ProductCard from "../products/ProductCard.jsx";
import StoreProduct from "./StoreProduct.jsx";
import ProductSkeletons from "../products/ProductSkeletons.jsx";

const StoreProducts = ({ storeId }) => {
  const { id } = useParams();
  const { data: user } = useMe();
  const { data: products, isLoading, isError, error } = useResourceData('products');
  const { data: store } = useResource('stores', storeId || id);
  const [opened, { open, close }] = useDisclosure(false);
  const [product, setProduct] = useState(null);

  if (isLoading) {
    return <ProductSkeletons />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const isOwner = user && user.current_store?.id === parseInt(storeId || id);

  const onProductClick = (product) => {
    setProduct(product);
    open();
  }

  const storeProductText = isOwner ? "Your Products" : store.name + "'s Products";

  return (
    <div>
      <div className="flex row align-center double-padding-lr space-between">
        <Text size="xl" className="bold margin-right">{storeProductText}</Text>

        {isOwner && <Button component={Link} to="/products/new" variant="filled" color="teal" disabled={!isOwner}>
          Add New Product
        </Button>}
      </div>

      {products.data.length === 0 ? (
        <div className="center-content margin-t-80"><p>You have not listed any products - click "Add new product" to get started</p></div>
      ) : (
        <div className="product-list">
          <div className="product-grid">
            {products && products.data.map(product => (
              <div key={product.id} className="product-card-wrapper" onClick={isOwner ? open : null}>
                <ProductCard key={product.id} cardData={product.attributes} clickable={false} />

                {isOwner && <Button onClick={() => onProductClick(product.attributes)} disabled={!isOwner} variant="outline" color="black" fullWidth mt="xs">
                  Manage Product
                </Button>}
              </div>
            ))}
          </div>
        </div>
      )}

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