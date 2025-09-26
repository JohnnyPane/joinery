import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createApi} from '../services/createApi.js';

export const useCreateResource = (modelName) => {
  const queryClient = useQueryClient();
  const modelApi = createApi(modelName);

  return useMutation({
    mutationFn: async (newResource) => {
      return await modelApi.create(newResource);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([modelName]);
    },
  });
}

export const useUpdateResource = (modelName) => {
  const queryClient = useQueryClient();
  const modelApi = createApi(modelName);

  return useMutation({
    mutationFn: async (updatedResource) => {
      return await modelApi.update(updatedResource.id, updatedResource);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([modelName]);
    },
  });
}
