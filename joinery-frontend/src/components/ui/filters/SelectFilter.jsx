import { Select } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const untransformValue = (value, operator) => {
  if (!value) return null;

  switch(operator) {
    case 'between':
      return value.join('-');
    default:
      return value;
  }
}

const SelectFilter = ({ filters, filter, handleFilterChange, filterClass, size }) => {
  return (
    <Select
      key={filter.name}
      label={filter.label}
      placeholder={filter.placeholder || `Select ${filter.label}`}
      value={untransformValue(filters[filter.name]?.value, filter.operator) || ''}
      data={filter.options}
      onChange={(value) => handleFilterChange(filter, value)}
      searchable={filter.searchable || false}
      rightSectionPointerEvents="none"
      rightSection={filter.searchable ? <IconSearch size={14} /> : null}
      clearable
      size={size}
      className={filterClass}
    />
  )
}

export default SelectFilter;