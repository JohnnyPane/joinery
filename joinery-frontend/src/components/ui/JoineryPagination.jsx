import { useCallback } from "react";
import { Pagination } from "@mantine/core";
import useResources from "../../hooks/useResources.js";
import { useResourceContext } from "../../context/ResourceContext.jsx";

const JoineryPagination = ({ resourceName }) => {
  const { page, setPage } = useResourceContext();
  const { totalPages } = useResources({ resourceName });

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, [setPage]);


  return (
    <div className="center-content">
      <Pagination
        value={page}
        onChange={handlePageChange}
        total={totalPages}
        size="sm"
        color="teal"
      />
    </div>
  );
}

export default JoineryPagination;
