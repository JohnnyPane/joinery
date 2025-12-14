import { productConfigs } from "../../utils/productConfigs.js";
import JoineryFormFields from "../ui/JoineryFormFields.jsx";
import FormGridInputs from "../ui/FormGridInputs.jsx";

const ProductableDetailsForm = ({ form }) => {
    return (
      <FormGridInputs form={form} formInputs={productConfigs[form.values.productable_type]} nestedFieldType="productable" />
    );
}

export default ProductableDetailsForm;
