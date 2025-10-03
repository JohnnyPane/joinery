import { productConfigs } from "../../utils/productConfigs.js";
import JoineryFormFields from "../ui/JoineryFormFields.jsx";

const ProductableDetailsForm = ({ form }) => {
  return productConfigs[form.values.productable_type].map((fieldConfig) => {
    return JoineryFormFields({form, fieldConfig, nestedFieldType: 'productable'})
  })
}

export default ProductableDetailsForm;
