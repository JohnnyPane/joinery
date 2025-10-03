import { NumberInput, TextInput, Textarea } from "@mantine/core";
import JoineryIconMap from "./JoineryIconMap.jsx";

const JoineryFormFields = ({ form, fieldConfig, nestedFieldType = null }) => {
  let props = {};
  if (nestedFieldType) {
    props = form.getInputProps(`${nestedFieldType}.${fieldConfig.name}`);
  } else {
    props = form.getInputProps(fieldConfig.name);
  }

  switch (fieldConfig.type) {
    case 'text':
      return (
        <TextInput
          label={fieldConfig.label}
          placeholder={fieldConfig.placeholder || `Enter ${fieldConfig.label.toLowerCase()}`}
          {...props}
          className="margin-bottom"
        />
      );
    case 'number':
      return (
        <NumberInput
          label={fieldConfig.label}
          placeholder={fieldConfig.placeholder || `Enter ${fieldConfig.label.toLowerCase()}`}
          leftSection={<JoineryIconMap iconName={fieldConfig.icon} size={12} />}
          {...props}
          className="margin-bottom"
          min={fieldConfig.min || 0}
        />
      );
    case 'textarea':
      return (
        <Textarea
          label={fieldConfig.label}
          placeholder={fieldConfig.placeholder || `Enter ${fieldConfig.label.toLowerCase()}`}
          {...props}
          className="margin-bottom"
        />
      );
    default:
      return null;
  }
}

export default JoineryFormFields;
