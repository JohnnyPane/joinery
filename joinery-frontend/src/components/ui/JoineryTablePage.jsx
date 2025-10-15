import { Card } from "@mantine/core";
import JoineryPagination from "./JoineryPagination.jsx";
import JoineryTable from "./JoineryTable.jsx";

const JoineryTablePage = ({ resourceName, columns, resourceData, onRowClick }) => {
  return (
    <div className="center-content">
      <Card shadow="sm" padding="lg" radius="md" withBorder className="joinery-table">
        <JoineryTable resourceData={resourceData} columns={columns} onRowClick={onRowClick} />

        <JoineryPagination resourceName={resourceName} />
      </Card>
    </div>
  );
}

export default JoineryTablePage;