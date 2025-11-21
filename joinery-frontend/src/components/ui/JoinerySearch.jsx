import { useState, useEffect } from "react";
import { Input } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useResourceContext } from "../../context/ResourceContext.jsx";

const JoinerySearch = ({ config, debounceValue = 100, searchLabel = "resources" }) => {
  const [localSearch, setLocalSearch] = useState('');
  const [debouncedSearch] = useDebouncedValue(localSearch, debounceValue);
  const { search, setSearch } = useResourceContext();

  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  const placeholderText = `Search ${searchLabel}...`;

  return (
    <Input
      placeholder={placeholderText}
      rightSection={<IconSearch size={16} />}
      w={400}
      value={search}
      clearable={true}
      {...config}
      onChange={(event) => {
        const value = event.currentTarget.value;
        setLocalSearch(value);
      }}
    />
  )
}

export default JoinerySearch;
