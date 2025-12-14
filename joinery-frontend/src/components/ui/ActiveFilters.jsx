import { Badge, Button, Tooltip, Text } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useResourceContext } from "../../context/ResourceContext.jsx";

const filterDisplayField = (field, config) => {
  const fields =  field.split(".")
  const filterField = fields[fields.length - 1]
  const filterLabel = config.find(filter => filter.name === filterField)?.label?.replace(/\([^)]*\)/g, '').trim();

  return filterLabel || filterField;
}

const getFieldUnit = (field) => {
  if (field.includes("inches")) {
    return 'in.';
  } else if (field.includes("feet")) {
    return 'ft.';
  } else if (field.includes("pounds")) {
    return 'lbs.';
  } else {
    return null;
  }
}

const filterDisplayValue = (value, filterField) => {
  const unit = getFieldUnit(filterField);

  if (Array.isArray(value)) {
    return value.join(" - ") + (unit ? ` ${unit}` : '');
  }

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  return value.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()) + (unit ? ` ${unit}` : '');
}

const ActiveFilters = ({ filterConfig }) => {
  const { filters, setFilters } = useResourceContext();
  const fields = Object.keys(filters || []);
  const clearFilter = (field) => {
    const newFilters = { ...filters };
    delete newFilters[field];
    setFilters(newFilters);
  }

  const clearAllFilters = () => {
    setFilters([]);
  }

  return (
    <div className="flex row flex-wrap align-center margin-top margin-bottom">
      {fields.map(filterField => {
        const fieldDisplayName = filterDisplayField(filterField, filterConfig);
        const filterValue = filters[filterField]?.value;
        const displayValue = filterDisplayValue(filterValue, filterField);

        return (
          // <Tooltip label={fieldDisplayName} key={filterField} position="top-start" withArrow arrowOffset={16}>
          <div>
            <Badge variant="default" size="xl" radius="sm" key={filterField} className="margin-right align-center padding-right-none transform-none normal-weight">
              <div className="label">
                {fieldDisplayName}: {displayValue}

                <Button
                  onClick={() => clearFilter(filterField)}
                  variant="transparent"
                  color="gray"
                  size="compact-xs"
                  className="margin-4-l"
                  style={{ marginBottom: '2px' }}
                >
                  <IconX size={14} />
                </Button>
              </div>
            </Badge>
          </div>
          // </Tooltip>
        )
      })}

      {fields.length > 0 && <Button onClick={clearAllFilters} className="hover-button" variant="transparent" color="default" size="sm">
        Clear Filters
      </Button>}
    </div>
  )
}

export default ActiveFilters;