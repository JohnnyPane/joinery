import { useResourceContext } from "../../context/ResourceContext.jsx";
import { Pagination } from "@mantine/core";
import useResources from "../../hooks/useResources.js";

const JoineryPagination = ({ resourceName }) => {
  const { page, perPage, setPage, setPerPage } = useResourceContext();
  const { total, totalPages } = useResources({ resourceName });

  const handlePageChange = (newPage) => {
    setPage(newPage);
  }

  return (
    <div>
      <Pagination
        page={page}
        onChange={handlePageChange}
        total={totalPages}
      />
    </div>
  );
}

export default JoineryPagination;