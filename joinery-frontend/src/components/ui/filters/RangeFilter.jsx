import { RangeSlider, Text } from "@mantine/core";

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
      <Text size="sm" fw={700} className="margin-bottom">{filter.label}</Text>

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

export default RangeFilter;