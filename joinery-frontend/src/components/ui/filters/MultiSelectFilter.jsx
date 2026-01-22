import { MultiSelect } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const MultiSelectFilter = ({ filters, filter, handleFilterChange, clearFilter, size }) => {
  const selectedValues = filters[filter.name]?.value || [];

  const handleChange = (value) => {
    if (value.length === 0) {
      clearFilter(filter.name);
    } else {
      handleFilterChange(filter, value);
    }
  };

  return (
    <MultiSelect
      key={filter.name}
      label={filter.label}
      placeholder={filter.placeholder || `Select ${filter.label}`}
      defaultValue={selectedValues}
      data={filter.options}
      onChange={(value) => handleChange(value)}
      searchable={true}
      rightSectionPointerEvents="none"
      rightSection={filter.searchable ? <IconSearch size={14} /> : null}
      clearable
      size={size}
      className="margin-bottom"
    />
  )
}

export default MultiSelectFilter;