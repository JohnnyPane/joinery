import { Text, Drawer, Button, Stack } from "@mantine/core";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";
import JoineryTablePage from "../ui/JoineryTablePage.jsx";
import JoineryFilters from "./JoineryFilters.jsx";
import JoineryScopes from "./JoineryScopes.jsx";
import { IconPlus } from "@tabler/icons-react";

const ResponsiveList = ({ resources, total, columns, CardComponent, onClick, resourceName, filterConfigs = [], scopeConfigs = [] }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [filtersOpened, {open, close}] = useDisclosure(false)

  if (isMobile) {
    const hasResources = resources?.data?.length > 0;

    return (
      <div>
        <div className="flex row to-right">
          <Button onClick={open} variant="subtle" color="black" className="margin" rightSection={<IconPlus size={16} />}>
            Add Filters
          </Button>
        </div>

        <Text size="xs" color="dimmed" className="margin-bottom">Total: {total}</Text>

        {hasResources && resources?.data.map(resource => (
          <div className="margin-bottom" key={resource.id}>
            <CardComponent item={resource} onClick={onClick} />
          </div>
        ))}

        {!hasResources && <Text className="center-text margin-t-80">No resources found.</Text> }

        <Drawer size="xs" opened={filtersOpened} onClose={close} position="right">
          <Stack>
            <JoineryScopes scopeConfigs={scopeConfigs} />
            <JoineryFilters filterConfigs={filterConfigs} orientation="vertical" />
          </Stack>
        </Drawer>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="flex row to-right margin-bottom align-bottom">
        <JoineryScopes scopeConfigs={scopeConfigs} />
        <JoineryFilters filterConfigs={filterConfigs} />
      </div>

      <JoineryTablePage onRowClick={onClick} resourceData={resources} columns={columns} resourceName={resourceName} />
    </div>
  )
}

export default ResponsiveList;