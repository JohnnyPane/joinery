import { SegmentedControl, Text } from "@mantine/core";

const SegmentedControlFilter = ({ filters, filter, handleFilterChange }) => {
  return (
    <div>
      <Text size="sm" fw={700} className="margin-bottom">{filter.label}</Text>
      <SegmentedControl
        data={filter.options}
        value={filters[filter.name]?.value || ''}
        onChange={(value) => handleFilterChange(filter, value)}
        withItemsBorders={false}
        className="double-margin-bottom full-width"
      />
    </div>
  )
}

export default SegmentedControlFilter;