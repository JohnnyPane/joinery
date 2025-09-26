import { productFieldConfigs } from "../../utils/productFieldConfigs.js";
import JoineryFormFields from "../ui/JoineryFormFields.jsx";

const ProductableDetailsForm = ({ form }) => {
  return productFieldConfigs[form.values.productable_type].map((fieldConfig) => {
    return JoineryFormFields({form, fieldConfig, nestedFieldType: 'productable'})
  })
}

export default ProductableDetailsForm;
