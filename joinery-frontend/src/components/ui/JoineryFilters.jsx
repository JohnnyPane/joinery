import { Select } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import { useResourceContext } from "../../context/ResourceContext.jsx";


const transformValue = (value, operator) => {
  switch(operator) {
    case 'between':
      return value.split('-').map(v => v.trim());
    default:
      return value;
  }
}

const untransformValue = (value, operator) => {
  if (!value) return null;

  switch(operator) {
    case 'between':
      return value.join('-');
    default:
      return value;
  }
}


const JoineryFilters = ({ filterConfigs, orientation = 'horizontal' }) => {
  const { filters, setFilters, setPage } = useResourceContext();
  const isHorizontalLayout = orientation === "horizontal"
  const filterDirection = isHorizontalLayout ? 'flex row' : 'flex column'
  const filterClass = isHorizontalLayout ? "horizontal-filter-select margin-right" : "vertical-filter-select double-margin-bottom"
  const size = isHorizontalLayout ? "xs" : "sm"

  const handleFilterChange = (filter, value) => {
    const { name, operator } = filter;
    const newFilters = { ...filters };

    if (!value) {
      delete newFilters[name];
      setFilters(newFilters);
      return;
    }

    const filterValue = transformValue(value, operator);

    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        [name]: { value: filterValue, operator }
      };
    });

    // MAJOR TODO: THIS IS A HACK TO RESET PAGINATION WHEN FILTERS CHANGE
    setPage(1);
  }

  return (
    <div className={filterDirection}>
      {filterConfigs.map((filter) => (
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
      ))}
    </div>
  );
}

export default JoineryFilters;