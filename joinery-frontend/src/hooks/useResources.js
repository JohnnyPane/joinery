import { useQuery } from '@tanstack/react-query';
import { createApi } from "../services/createApi.js";
import { useResourceContext } from "../context/ResourceContext.jsx";

const useResources = (overrides = {}) => {
  const context = useResourceContext?.() || {};

  const {
    page = 1,
    perPage = 10,
    sortColumn = 'id',
    sortDirection = 'desc',
    filters = {},
    scopes = [],
    search = '',
    searchColumn = null,
    imageSize = 'default',
    resourceName,
    extraParams = {},
  } = { ...context, ...overrides };

  if (!resourceName) {
    throw new Error("useResources requires a resourceName (either from context or override)");
  }

  const resourceApi = createApi(resourceName);

  const queryParams = {
    page,
    per_page: perPage,
    sort_column: sortColumn,
    sort_direction: sortDirection,
    filters,
    scopes,
    image_size: imageSize,
    search: { text: search, column: searchColumn },
    ...extraParams,
  };

  const queryKey = [
    resourceName,
    page,
    perPage,
    sortColumn,
    sortDirection,
    JSON.stringify(filters),
    JSON.stringify(scopes),
    search,
    searchColumn,
    imageSize,
    JSON.stringify(extraParams),
  ];

  const { data: queryData, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: async () => {
      return await resourceApi.query(queryParams);
    },
    keepPreviousData: true,
    staleTime: 60 * 1000, // 1 minute
  });

  const data = queryData?.data || [];
  const meta = data?.meta || {};

  return {
    data,
    meta,
    total: meta.total_count || 0,
    totalPages: meta.total_pages || 0,
    perPage: meta.per_page || perPage,
    page: meta.page || page,
    isLoading,
    isError,
    error,
  };
};

export default useResources;
