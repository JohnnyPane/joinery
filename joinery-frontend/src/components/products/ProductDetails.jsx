import { Accordion } from "@mantine/core";

const ProductDetails = ({ product }) => {
  if (!product) return null;

  const renderProductSpecifics = () => {
    if (!product.productable_attributes) return null;

    const productable = product.productable_attributes;

    switch (product.productable_type) {
      case 'Slab':
        return (
          <div className="product-specifics">
            <p>Material: {productable.species}</p>
            <p>Length: {productable.length}"</p>
            <p>Width: {productable.width}"</p>
            <p>Height: {productable.height}"</p>
          </div>
        );
      default:
        return null;
    }
  };

  const productSpecifics = renderProductSpecifics();

  return (
    <Accordion defaultValue={product.id}>
      <Accordion.Item key="details" value="details">
        <Accordion.Control className="accordion-panel-header">Details</Accordion.Control>
        <Accordion.Panel className="product-detail-description">{productSpecifics}</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

export default ProductDetails;