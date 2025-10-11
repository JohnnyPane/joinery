import { useResourceContext } from "../context/ResourceContext.jsx";
import useResources  from "./useResources.js";

const useResourceData = (resourceName, extraParams = {}) => {

  const { page, perPage, sortColumn, sortDirection, filters, scopes, search } = useResourceContext();

  return useResources({
    resourceName,
    page,
    perPage,
    sortColumn,
    sortDirection,
    filters,
    scopes,
    search,
    extraParams
  });
}

export default useResourceData;