import SelectFilter from "./filters/SelectFilter.jsx";
import RangeFilter from "./filters/RangeFilter.jsx";
import InputRangeFilter from "./filters/InputRangeFilter.jsx";
import SegmentedControlFilter from "./filters/SegmentedControlFilter.jsx";
import MultiSelectFilter from "./filters/MultiSelectFilter.jsx";
import { useResourceContext } from "../../context/ResourceContext.jsx";


const transformValue = (value, operator, filterType) => {
  switch(operator) {
    case 'between':
      if (filterType !== "range" && filterType !== "input_range") {
        return value.split('-').map(v => v.trim());
      } else {
        return value
      }
    case 'in':
      if (filterType === "multi_select") {
        return value;
      }

      return value.split(',');
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

  const clearFilter = (filterName) => {
    const newFilters = { ...filters };
    delete newFilters[filterName];
    setFilters(newFilters);
  }

  return (
    <div className={filterDirection}>
      {filterConfigs.map((filter) => {
        switch (filter.type) {
          case 'multi_select':
            return <MultiSelectFilter filters={filters} filter={filter} handleFilterChange={handleFilterChange} size={size} clearFilter={clearFilter} />
          case 'select':
            return <SelectFilter filters={filters} filter={filter} filterClass={filterClass} handleFilterChange={handleFilterChange} size={size} />
          case 'range':
            return <RangeFilter filters={filters} filter={filter} handleFilterChange={handleFilterChange} />
          case 'input_range':
            return <InputRangeFilter filters={filters} filter={filter} handleFilterChange={handleFilterChange} clearFilter={clearFilter} />
          case 'segmented':
            return <SegmentedControlFilter filters={filters} filter={filter} handleFilterChange={handleFilterChange} />
          default:
            return <SelectFilter filters={filters} filter={filter} filterClass={filterClass} handleFilterChange={handleFilterChange} size={size} />
        }
      })}
    </div>
  );
}

export default JoineryFilters;