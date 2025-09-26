import {useQuery} from '@tanstack/react-query';
import {createApi} from "../services/createApi.js";

const useResource = (resourceName, id, extraParams = {}) => {
  const resourceApi = createApi(resourceName);
  const queryKey = [resourceName, id];

  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: async () => {
      return await resourceApi.get(id, extraParams);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    data: data || null,
    isLoading,
    isError,
    error,
  };
}

export default useResource;