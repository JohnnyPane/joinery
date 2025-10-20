import { Text, Accordion } from "@mantine/core";

const productableAttributes = {
  Slab: [{ name: 'species', label: 'Species' }, { name: 'length', label: 'Length (inches)' }, { name: 'width', label: 'Width (inches)' }, { name: 'height', label: 'Height (inches)' }],
  Log: [{ name: 'species', label: 'Species' }, { name: 'length', label: 'Length (inches)' }, { name: 'diameter', label: 'Diameter (inches)' }, { name: 'grade', label: 'Grade' }, { name: 'moisture_content', label: 'Moisture Content' }],
}

const ProductDetails = ({ product }) => {
  if (!product) return null;
  const { productable } = product;
  const displayAttributes = productableAttributes[product.productable_type] || [];

  return (
    <Accordion defaultValue={product.id}>
      <Accordion.Item key="details" value="details">
        <Accordion.Control className="accordion-panel-header">Details</Accordion.Control>
        <Accordion.Panel className="product-detail-description">
          {displayAttributes.map((attr) => (
            <div key={attr.name} style={{ marginBottom: '8px' }} className="flex row">
              <Text className="bold margin-right">{attr.label}:</Text>
              <Text color="dimmed">{productable[attr.name] || ''}</Text>
            </div>
          ))}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

export default ProductDetails;