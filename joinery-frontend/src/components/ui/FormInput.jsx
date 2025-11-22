import { TextInput, Checkbox, Textarea, NumberInput, Select } from "@mantine/core";

const FormInput = ({ label, placeholder, required, type, value, onChange, error, hidden = false, small = false, description, ...rest }) => {
  const formComponent = formInputDelegator[type];

  if (!formComponent) {
    return null;
  }

  if (hidden) {
    return null;
  }

  const className = small ? "small-input" : "";

  return formComponent({
    label,
    placeholder,
    required,
    type,
    value,
    onChange,
    error,
    description,
    className,
    ...rest
  });
}

const TextInputField = ({ label, description, placeholder, required, type, value, onChange, error, ...rest }) => {
  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      required={required}
      type={type}
      value={value}
      onChange={onChange}
      error={error}
      description={description}
      {...rest}
    />
  );
}

const TextareaField = ({ label, placeholder, required, value, onChange, error, ...rest }) => {
  return (
    <Textarea
      label={label}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
      error={error}
      {...rest}
    />
  );
}

const NumberInputField = ({ label, placeholder, required, value, onChange, error, ...rest }) => {
  return (
    <NumberInput
      label={label}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
      error={error}
      {...rest}
    />
  );
}

const CheckboxField = ({ label, onChange, ...rest }) => {
  const checked = rest.checked || false;
  return (
    <Checkbox
      label={label}
      onChange={onChange}
      className="margin-top"
      checked={checked}
    />
  );
}

const SelectField = ({ label, onChange, ...rest }) => {
  return (
    <Select
      label={label}
      onChange={onChange}
      {...rest}
    />
  )
}

const formInputDelegator = {
  text: TextInputField,
  checkbox: CheckboxField,
  textarea: TextareaField,
  number: NumberInputField,
  select: SelectField,
};

export default FormInput;
