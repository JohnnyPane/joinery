import { useResourceContext } from "../../context/ResourceContext.jsx";
import { Pagination } from "@mantine/core";
import useResources from "../../hooks/useResources.js";

const JoineryPagination = ({ resourceName }) => {
  const { page, setPage } = useResourceContext();
  const { totalPages } = useResources({ resourceName });

  const handlePageChange = (newPage) => {
    setPage(newPage);
  }

  return (
    <div className="center-content">
      <Pagination
        page={page}
        onChange={handlePageChange}
        total={totalPages}
        size="sm"
        color="teal"
        className="margin-b-80"
      />
    </div>
  );
}

export default JoineryPagination;