import { useQuery } from '@tanstack/react-query';
import { createApi } from "../services/createApi.js";

const useResources = ({ page = 1, perPage = 10, sortColumn = 'id', sortDirection = 'desc', filters = {}, scopes = [], search = '', searchColumn = null, imageSize = 'default', resourceName, extraParams = {} }) => {
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
    ...extraParams
  }

  const queryKey = [
    resourceName,
    queryParams
  ];

  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await resourceApi.query(queryParams);
      return response;
    },
    keepPreviousData: true,
    staleTime: 60 * 1000, // 1 minute
  });

  const meta = data?.meta || {};

  return {
    data: data?.data || [],
    total: meta.total_count || 0,
    totalPages: meta.total_pages || 0,
    perPage: meta.per_page || perPage,
    page: meta.page || page,
    isLoading,
    isError,
    error,
  };
}

export default useResources;
