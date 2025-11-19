import { useMediaQuery } from "@mantine/hooks";
import { Text } from "@mantine/core";
import JoineryTablePage from "../ui/JoineryTablePage.jsx";

const ResponsiveList = ({ resources, total, columns, CardComponent, onClick, resourceName }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (!resources || resources.length === 0) {
    return <Text className="center-text margin-t-80">No {resourceName} found.</Text>;
  }

  if (isMobile) {
    return (
      <div>
        <Text size="xs" color="dimmed" className="margin-bottom">Total: {total}</Text>

        {resources.data.map(resource => (
          <div className="margin-bottom" key={resource.id}>
            <CardComponent item={resource} onClick={onClick} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <JoineryTablePage onRowClick={onClick} resourceData={resources} columns={columns} resourceName={resourceName} />
  )
}

export default ResponsiveList;