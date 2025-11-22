import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { useProductForm } from "../../hooks/useProductForm.js";
import { useUpdateResource } from "../../hooks/useResourceMutations.js";
import ProductDetailsForm from "../products/ProductDetailsForm.jsx";
import ProductableDetailsForm from "../products/ProductableDetailsForm.jsx";

const StoreProduct = ({ close, product }) => {
  const form = useProductForm(product);
  const updateProduct = useUpdateResource('products');

  const handleProductDetailsUpdate = (values) => {
    const payload = {
      id: values.id,
      name: values.name,
      description: values.description,
      price_in_cents: values.price_in_cents,
      quantity: values.quantity,
      productable_attributes: values.productable,
    }

    updateProduct.mutate(payload, {
      onSuccess: () => {
        notifications.show({ message: 'Product updated successfully', color: 'green', position: 'top-right' });
        close();
      },
      onError: (error) => {
        notifications.show({ message: `Failed to update product: ${error.message}`, color: 'red' });
      }
    });
  }

  return (
    <div className="store-product-card">
      {form &&
        <form>
          <ProductDetailsForm formType="update" product={product} form={form} />

          <ProductableDetailsForm form={form} resource={product.productable} />
          <Button onClick={form.onSubmit(handleProductDetailsUpdate)} disabled={!form.isDirty() || !form.isValid()} className="margin-top">
            Save Product Changes
          </Button>
        </form>
      }
    </div>
  );
}

export default StoreProduct;