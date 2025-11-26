import { Text, Accordion } from "@mantine/core";

const productableAttributes = {
  Slab: [{ name: 'species', label: 'Species' }, { name: 'length', label: 'Length (inches)' }, { name: 'width', label: 'Width (inches)' }, { name: 'height', label: 'Height (inches)' }],
  Log: [{ name: 'species', label: 'Species' }, { name: 'length', label: 'Length (inches)' }, { name: 'diameter', label: 'Diameter (inches)' }, { name: 'grade', label: 'Grade' }, { name: 'moisture_content', label: 'Moisture Content' }],
  RoughLumber: [
    { name: 'species', label: 'Species' },
    { name: 'moisture_content_percent', label: 'Moisture Content' },
    { name: 'grade', label: 'grade' },
    { name: 'board_feet', label: 'Board feet' },
    { name: 'length_in_feet', label: 'length_in_feet' },
    { name: 'nominal_thickness_inches', label: 'Thickness (inches)' },
    { name: 'nominal_width_inches ', label: 'Width (inches)' }
  ],
  SurfacedLumber: [
    { name: 'species', label: 'Species' },
    { name: 'moisture_content_percent', label: 'Moisture Content' },
    { name: 'nominal_dimension', label: 'Dimensions' },
    { name: 'length_in_feet', label: 'length_in_feet' },
    { name: 'profile', label: 'Profile' },
    { name: 'treatment', label: 'Treatment' }
  ],
  TurningBlank: [
    { name: 'species', label: 'Species' },
    { name: 'moisture_content_percent', label: 'Moisture Content' },
    { name: 'thickness_in_inches', label: 'Thickness (inches)' },
    { name: 'width_in_inches ', label: 'Width (inches)' },
    { name: 'length_in_inches', label: 'Length (inches)' },
    { name: 'cubic_inches', label: 'Cubic Inches' },
    { name: 'shape', label: 'Blank Shape' },
    { name: 'figure_type', label: 'Figure Type' },
    { name: 'wax_sealed', label: 'Wax Sealed' }
  ],
  CarvingStock: [
    { name: 'species', label: 'Species' },
    { name: 'moisture_content_percent', label: 'Moisture Content' },
    { name: 'thickness_in_inches', label: 'Thickness (inches)' },
    { name: 'width_in_inches ', label: 'Width (inches)' },
    { name: 'board_feet', label: 'Board Feet' },
    { name: 'grade', label: 'Grade' },
    { name: 'grain_structure', label: 'Grain Structure' },
    { name: 'weight_in_pounds', label: 'Weight (lbs.)' },
  ]
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