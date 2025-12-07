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
  WoodBlock: [
    { name: 'species', label: 'Species' },
    { name: 'ideal_application', label: 'Ideal For' },
    { name: 'is_carving_suitable', label: 'Carving Suitable' },
    { name: 'moisture_content_percent', label: 'Moisture Content' },
    { name: 'thickness_in_inches', label: 'Thickness (inches)' },
    { name: 'width_in_inches', label: 'Width (inches)' },
    { name: 'length_in_inches', label: 'Length (inches)' },
    { name: 'cubic_inches', label: 'Cubic Inches' },
    { name: 'shape', label: 'Blank Shape' },
    { name: 'figure_types', label: 'Figure Types' },
    { name: 'grain_orientation', label: 'Grain Orientation' },
    { name: 'wax_sealed', label: 'Wax Sealed' },
    { name: 'is_reclaimed', label: 'Reclaimed' },
    { name: 'is_carving_suitable', label: 'Blank is suitable for carving', type: 'switch', required: false },
  ],
  SheetGood: [
    { name: 'material_type', label: 'Material Type' },
    { name: 'face_species', label: 'Face Species' },
    { name: 'back_species', label: 'Back Species' },
    { name: 'grade_face', label: 'Grade Face' },
    { name: 'grade_back', label: 'Grade Back' },
    { name: 'core_type', label: 'Core Type' },
    { name: 'cut_style', label: 'Cut Style' },
    { name: 'ply_count', label: 'Ply Count' },
    { name: 'glue_type', label: 'Glue Type' },
    { name: 'thickness_nominal', label: 'Thickness Nominal' },
    { name: 'thickness_actual', label: 'Thickness Actual' },
    { name: 'width_in_feet', label: 'Width (feet)' },
    { name: 'length_in_feet', label: 'Length (feet)' },
    { name: 'is_prefinished', label: 'Prefinished' },
    { name: 'is_shop_grade', label: 'Shop Grade' },
    { name: 'matching', label: 'Matching' },
  ],
}

const convertDisplayValue = (value) => {
  if (value === null || value === undefined) return '';

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  return value;
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
              <Text color="dimmed">{convertDisplayValue(productable[attr.name])}</Text>
            </div>
          ))}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

export default ProductDetails;