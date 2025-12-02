import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Drawer, Modal, Title } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";

import { useMe } from '../../hooks/useMe';
import useResourceData from '../../hooks/useResourceData';
import useResource from "../../hooks/useResource.js";
import { useUpdateResource } from "../../hooks/useResourceMutations.js";

import ProductCard from "../products/ProductCard.jsx";
import StoreProduct from "./StoreProduct.jsx";
import ProductSkeletons from "../products/ProductSkeletons.jsx";
import JoinerySearch from "../ui/JoinerySearch.jsx";
import ProductShippingOptionsForm from "../products/ProductShippingOptionsForm.jsx";
import { useProductForm, getInitialProductFormValues, submittableShippingOptions } from "../../hooks/useProductForm.js";
import { notifications } from "@mantine/notifications";

const StoreProducts = ({ storeId }) => {
  const { id } = useParams();
  const { data: user } = useMe();
  const { data: products, isLoading } = useResourceData('products');
  const { data: store } = useResource('stores', storeId || id);

  const [productId, setProductId] = useState(null);
  const { data: selectedProduct } = useResource('products', productId);
  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [shippingOpened, { open: openShipping, close: closeShipping }] = useDisclosure(false);
  const { mutateAsync: updateProduct } = useUpdateResource('products');

  const form = useProductForm(selectedProduct);

  useEffect(() => {
    if (selectedProduct) {
      form.setValues(getInitialProductFormValues(selectedProduct));
    }
  }, [selectedProduct]);

  const isOwner = user && user.current_store?.id === parseInt(storeId || id);

  const onManageClick = (product, openFn) => {
    setProductId(product.id);
    openFn();
  }

  const onEditClose = (closeFn) => {
    setProductId(null);
    closeFn();
  }

  const handleShippingOptionsSubmit = async () => {
    const shipping_options_attributes = submittableShippingOptions(form.values);

    try {
      await updateProduct({
        id: form.values.id,
        shipping_options_attributes: shipping_options_attributes,
      })

      notifications.show({ message: `${form.values.name} shipping options updated`, color: 'green', position: 'top-right' });
      onEditClose(closeShipping);
    } catch (error) {
      notifications.show({ message: `Error updating shipping options: ${error.message}`, color: 'red', position: 'top-right' });
    }
  }

  const storeProductText = isOwner ? "Your Products" : store.name + "'s Products";

  return (
    <div>
      <div className="flex row align-center double-padding-lr space-between">
        <Title order={2}>{storeProductText}</Title>

        {isOwner && <Button
          component={Link}
          to="/products/new"
          variant="light"
          color="blue"
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
            <div key={product.id} className="product-card-wrapper">
              <ProductCard key={product.id} cardData={product.attributes} clickable={true} />

              {isOwner &&
                <div className="flex column">
                  <Button onClick={() => onManageClick(product.attributes, openEdit)} disabled={!isOwner} variant="outline" color="black" fullWidth mt="xs">
                    Manage Product
                  </Button>

                  <Button onClick={() => onManageClick(product.attributes, openShipping)} variant="outline" color="gray" fullWidth mt="xs">
                    Manage Product Shipping
                  </Button>
                </div>}
            </div>
          ))}
        </div>
      </div>

      {isOwner && (
        <Drawer
          opened={editOpened}
          onClose={() => onEditClose(closeEdit)}
          title={`Manage ${selectedProduct?.name}`}
          position="right"
          size="lg"
        >
          {selectedProduct && <StoreProduct close={() => onEditClose(closeEdit)} product={selectedProduct}/>}
        </Drawer>
      )}

      {isOwner && (
        <Modal
          opened={shippingOpened}
          onClose={() => onEditClose(closeShipping)}
          title={`Manage Shipping Options for ${selectedProduct?.name}`}
          size="lg"
        >
          {selectedProduct && <ProductShippingOptionsForm form={form} />}

          <Button
            mt="md"
            fullWidth
            onClick={handleShippingOptionsSubmit}
          >
            Save Shipping Options
          </Button>
        </Modal>
      )}
    </div>
  );
}

export default StoreProducts;