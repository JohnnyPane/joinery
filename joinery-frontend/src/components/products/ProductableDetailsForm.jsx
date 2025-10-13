import { productConfigs } from "../../utils/productConfigs.js";
import JoineryFormFields from "../ui/JoineryFormFields.jsx";

const ProductableDetailsForm = ({ form, productable }) => {
  return productConfigs[form.values.productable_type].map((fieldConfig, index) => {

    return (
      <div key={index}>
        {JoineryFormFields({
          form,
          fieldConfig,
          nestedFieldType: 'productable',
          resource: productable
        })}
      </div>
    )
  })
}

export default ProductableDetailsForm;
