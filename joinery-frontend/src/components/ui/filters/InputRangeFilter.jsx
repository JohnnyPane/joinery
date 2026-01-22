import { useEffect, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { NumberInput, Text, Group, Stack } from '@mantine/core';

const InputRangeFilter = ({ filters, filter, handleFilterChange, clearFilter }) => {
  const parentMin = filters[filter.name]?.value?.[0] ?? '';
  const parentMax = filters[filter.name]?.value?.[1] ?? '';

  const [minGreaterThanMaxError, setMinGreaterThanMaxError] = useState(false);
  const [localRange, setLocalRange] = useState([parentMin, parentMax]);
  const [debouncedRange] = useDebouncedValue(localRange, 500);

  useEffect(() => {
    if (parentMin !== localRange[0] || parentMax !== localRange[1]) {
      setLocalRange([parentMin, parentMax]);
    }
  }, [parentMin, parentMax]);

  useEffect(() => {
    const [dMin, dMax] = debouncedRange;

    if (dMin === '' && dMax === '' || ((dMin === '' || dMin === filter.min) && (dMax === '' || dMax === filter.max))) {
      setMinGreaterThanMaxError(false);
      clearFilter(filter.name);
      return;
    }

    if (dMin !== '' && dMax !== '' && dMin > dMax) {
      setMinGreaterThanMaxError(true);
      return;
    }

    setMinGreaterThanMaxError(false);

    if (dMin !== parentMin || dMax !== parentMax) {

      const finalMin = dMin === '' ? filter.min : dMin;
      const finalMax = dMax === '' ? filter.max : dMax;

      handleFilterChange(filter, [finalMin, finalMax]);
    }
  }, [debouncedRange]);

  const handleUpdate = (val, index) => {
    const nextRange = [...localRange];
    nextRange[index] = val;
    setLocalRange(nextRange);
  };

  return (
    <Stack className="double-margin-bottom" gap={0}>
      <Text size="sm" fw={700}>
        {filter.label}
      </Text>

      <Group grow wrap="nowrap">
        <NumberInput
          label="Min"
          placeholder={filter.min.toString()}
          defaultValue={parentMin}
          onChange={(val) => handleUpdate(val, 0)}
          min={filter.min}
          max={filter.max}
          hideControls
        />

        <NumberInput
          label="Max"
          placeholder={filter.max.toString()}
          defaultValue={parentMax}
          onChange={(val) => handleUpdate(val, 1)}
          min={filter.min}
          max={filter.max}
          hideControls
        />
      </Group>
      {minGreaterThanMaxError && (
        <Text size="xs" color="red">
          Minimum value cannot be greater than maximum value.
        </Text>
      )}
    </Stack>
  );
};

export default InputRangeFilter;