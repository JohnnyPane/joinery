import { Table, Text, Badge } from "@mantine/core"
import { statusColors } from "../../utils/colorConfigs.js";
import { readableDate } from "../../utils/humanizeText.js";

const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

const TransformComponent = ({ componentType, value }) => {
  switch (componentType) {
    case 'badge':
      const color = statusColors(value);
      return <Badge variant="light" color={color}>{value}</Badge>;
    case 'boolean':
      return <Badge variant="light" color={value ? 'teal' : 'gray'}>{value ? 'Yes' : 'No'}</Badge>;
    case 'date':
      return readableDate(value);
    default:
      return value;
  }
}

const JoineryTable = ({ columns, resourceData, onRowClick }) => {
  const data = resourceData?.data;
  const meta = resourceData?.meta;

  if (!data || data.length === 0) {
    return <div>No data available.</div>;
  }

  const handleRowClick = (row) => {
    if (onRowClick) {
      onRowClick(row);
    }
  }

  return (
    <>
      <Text size="xs" color="dimmed">
        Total: {meta?.total_count}
      </Text>
      <Table highlightOnHover className="double-margin-bottom">
        <Table.Thead>
          <Table.Tr>
            {columns.map((column) => (
              <Table.Th key={column.header}>{column.header}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((row, rowIndex) => (
            <Table.Tr key={rowIndex} onClick={() => handleRowClick(row)} style={{ cursor: onRowClick ? 'pointer' : 'default' }}>
              {columns.map((column) => (
                <Table.Td
                  key={column.accessor}
                  style={{
                    maxWidth: "250px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <TransformComponent componentType={column.type} value={getNestedValue(row['attributes'], column.accessor)} />
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
}

export default JoineryTable;