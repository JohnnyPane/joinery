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


const JoineryFilters = ({ filterConfigs }) => {
  const { filters, setFilters } = useResourceContext();

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
  }

  return (
    <div className="joinery-filters">
      {filterConfigs.map((filter) => (
        <Select
          key={filter.name}
          label={filter.label}
          placeholder={filter.placeholder || `Select ${filter.label}`}
          data={filter.options}
          onChange={(value) => handleFilterChange(filter, value)}
          searchable={filter.searchable || false}
          rightSectionPointerEvents="none"
          rightSection={filter.searchable ? <IconSearch size={14} /> : null}
          clearable
          size="xs"
          className="filter-select"
        />
      ))}
    </div>
  );
}

export default JoineryFilters;