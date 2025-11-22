import { NumberInput, TextInput, Textarea, Select } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import JoineryIconMap from "./JoineryIconMap.jsx";
import StarRatingInput from "./StarRatingInput.jsx";

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
          leftSection={fieldConfig.icon ? <JoineryIconMap iconName={fieldConfig.icon} size={12} />: null}
          value={fieldConfig.value || ''}
          {...props}
          className="margin-bottom"
        />
      );
    case 'number':
      return (
        <NumberInput
          label={fieldConfig.label}
          placeholder={fieldConfig.placeholder || `Enter ${fieldConfig.label.toLowerCase()}`}
          leftSection={<JoineryIconMap iconName={fieldConfig.icon} size={14} />}
          value={fieldConfig.value || ''}
          {...props}
          min={fieldConfig.min || 0}
          max={fieldConfig.max || 999999999999999 }
        />
      );
    case 'textarea':
      return (
        <Textarea
          label={fieldConfig.label}
          placeholder={fieldConfig.placeholder || `Enter ${fieldConfig.label.toLowerCase()}`}
          value={fieldConfig.value || ''}
          {...props}
          className="margin-bottom"
        />
      );
    case 'select':
      return (
        <Select
          label={fieldConfig.label}
          placeholder={fieldConfig.placeholder || `Select ${fieldConfig.label.toLowerCase()}`}
          data={fieldConfig.options || []}
          value={fieldConfig.value || ''}
          searchable={fieldConfig.searchable || false}
          rightSectionPointerEvents="none"
          rightSection={fieldConfig.searchable ? <IconSearch size={14} /> : null}
          {...props}
          className="margin-bottom"
        />
      );
    case 'star_rating':
        return (
          <StarRatingInput {...form.getInputProps('rating')} />
        )
    default:
      return null;
  }
}

export default JoineryFormFields;
