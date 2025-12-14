import { Select, RangeSlider, Text } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import { useResourceContext } from "../../context/ResourceContext.jsx";


const transformValue = (value, operator, filterType) => {

  switch(operator) {
    case 'between':
      if (filterType !== "range") {
        return value.split('-').map(v => v.trim());
      } else {
        return value
      }
    case 'in':
      return value.split(',');
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

const rangeMarks = (min = 0, max = 100) => {
  const range = max - min;
  const oneQuarter = min + range / 4;
  const threeQuarter = min + (3 * range) / 4;
  const mid = min + range / 2;

  return [
    { value: min, label: `${min}` },
    { value: oneQuarter, label: `${Math.floor(oneQuarter)}` },
    { value: mid, label: `${Math.floor(mid)}` },
    { value: threeQuarter, label: `${Math.floor(threeQuarter)}` },
    { value: max, label: `${max}` },
  ]
}

const RangeFilter = ({ filters, filter, handleFilterChange }) => {
  return (
    <div>
      <Text size="sm" className="margin-bottom">{filter.label}</Text>

      <RangeSlider
        onChangeEnd={(value) => handleFilterChange(filter, value)}
        defaultValue={filters[filter.name]?.value}
        min={filter.min || 0}
        max={filter.max || 100}
        minRange={1}
        marks={rangeMarks(filter.min, filter.max)}
        mb={32}
        styles={{ markLabel: { fontSize: '12px' } }}
      />
    </div>
  )
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


const JoineryFilters = ({ filterConfigs, orientation = 'horizontal' }) => {
  const { filters, setFilters, setPage } = useResourceContext();
  const isHorizontalLayout = orientation === "horizontal"
  const filterDirection = isHorizontalLayout ? 'flex row' : 'flex column'
  const filterClass = isHorizontalLayout ? "horizontal-filter-select margin-right" : "vertical-filter-select double-margin-bottom"
  const size = isHorizontalLayout ? "xs" : "sm"

  const handleFilterChange = (filter, value) => {
    const { name, operator, polymorphic_types } = filter;
    const newFilters = { ...filters };

    if (!value) {
      delete newFilters[name];
      setFilters(newFilters);
      return;
    }

    const filterValue = transformValue(value, operator, filter.type);

    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        [name]: { value: filterValue, operator, polymorphic_types }
      };
    });

    // MAJOR TODO: THIS IS A HACK TO RESET PAGINATION WHEN FILTERS CHANGE
    setPage(1);
  }

  return (
    <div className={filterDirection}>
      {filterConfigs.map((filter) => {
        switch (filter.type) {
          case 'select':
            return <SelectFilter filters={filters} filter={filter} filterClass={filterClass} handleFilterChange={handleFilterChange} size={size} />
          case 'range':
            return <RangeFilter filters={filters} filter={filter} handleFilterChange={handleFilterChange} />
          default:
            return <SelectFilter filters={filters} filter={filter} filterClass={filterClass} handleFilterChange={handleFilterChange} size={size} />
        }
      })}
    </div>
  );
}

export default JoineryFilters;