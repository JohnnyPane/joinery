import { Text, Accordion } from "@mantine/core";

const productableAttributes = {
  Slab: [
    { name: 'species', label: 'Species' },
    { name: 'length_in_inches', label: 'Length (inches)' },
    { name: 'width_at_narrowest_in_inches', label: 'Width at Narrowest (inches)' },
    { name: 'width_at_widest_in_inches', label: 'Width at Widest (inches)' },
    { name: 'thickness_in_inches', label: 'Thickness (inches)' },
    { name: 'kiln_dried', label: 'Kiln Dried' },
    { name: 'moisture_content_percent', label: 'Moisture Content' },
    { name: 'drying_status', label: 'Drying Status' },
    { name: 'weight_in_pounds', label: 'Weight (pounds)' },
    { name: 'slab_type', label: 'Slab Type' },
    { name: 'calculated_board_feet', label: 'Calculated Board Feet' },
  ],
  Log: [
    { name: 'species', label: 'Species' },
    { name: 'length_in_feet', label: 'Length (feet)' },
    { name: 'diameter_at_small_end_in_inches', label: 'Diameter at Small End (inches)' },
    { name: 'diameter_at_large_end_in_inches', label: 'Diameter at Large End (inches)' },
    { name: 'weight_in_pounds', label: 'Weight (pounds)' },
    { name: 'estimated_board_feet', label: 'Estimated Board Feet' },
    { name: 'moisture_content_percent', label: 'Moisture Content' },
    { name: 'grade', label: 'Grade' },
    { name: 'origin', label: 'Origin' },
  ],
  Lumber: [
    { name: 'species', label: 'Species' },
    { name: 'finish_type', label: 'Finish Type' },
    { name: 'nominal_dimension', label: 'Nominal Dimensions' },
    { name: 'thickness_in_inches', label: 'Thickness (inches)' },
    { name: 'width_in_inches', label: 'Width (inches)' },
    { name: 'length_in_feet', label: 'Length (feet)' },
    { name: 'board_feet', label: 'Board feet' },
    { name: 'moisture_content_percent', label: 'Moisture Content' },
    { name: 'grade', label: 'Grade' },
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
  Timber: [
    { name: 'species', label: 'Species' },
    { name: 'nominal_dimension', label: 'Nominal Dimensions' },
    { name: 'length_in_feet', label: 'Length (feet)' },
    { name: 'board_feet', label: 'Board feet' },
    { name: 'grading_standard', label: 'Grading Standard' },
    { name: 'heart_content_type', label: 'Heart Content' },
    { name: 'surface_finish_type', label: 'Surface Finish' },
    { name: 'moisture_condition', label: 'Moisture Condition' },
    { name: 'preservative_treatment', label: 'Preservative Treatment' },
    { name: 'end_cut_style', label: 'End Cut Style' },
  ],
}

const convertDisplayValue = (value) => {
  if (value === null || value === undefined) return '';

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  if (typeof value === 'string') {
    return value.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
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