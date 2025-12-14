import { Drawer } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import { useResourceContext } from "../../context/ResourceContext.jsx";

const ProductFiltersDrawer = ({ opened, onClose }) => {
 const { filters, setFilters } = useResourceContext();

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Filters"
      padding="md"
      size="sm"
    >
      {/* Replace the following div with actual filter components */}
      <div>
        {/* Example filter component */}
        {/* <JoineryFilters filters={filters} setFilters={setFilters} /> */}
        Filters go here
      </div>
    </Drawer>
  );
}

export default ProductFiltersDrawer;