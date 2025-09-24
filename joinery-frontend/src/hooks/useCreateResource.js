import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createApi } from '../services/createApi.js';

const useCreateResource = (modelName) => {
  const queryClient = useQueryClient();
  const modelApi = createApi(modelName);

  return useMutation({
    mutationFn: async (newProduct) => {
      const response = await modelApi.create(newProduct);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([modelName]);
    },
  });
}

export default useCreateResource;