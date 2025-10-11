import { productConfigs } from "../../utils/productConfigs.js";
import JoineryFormFields from "../ui/JoineryFormFields.jsx";

const ProductableDetailsForm = ({ form }) => {
  return productConfigs[form.values.productable_type].map((fieldConfig, index) => {
    return (
      <div key={index}>
        {JoineryFormFields({form, fieldConfig, nestedFieldType: 'productable'})}
      </div>
    )
  })
}

export default ProductableDetailsForm;
