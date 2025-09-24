import { useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from "../services/authService.js";
import joineryClient from "../services/joineryClient.js";

export function useMe() {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      if (!authService.isAuthenticated()) {
        return null;
      }

      const { data } = await joineryClient.get('/users/me');
      return data;
    },
    onError: (error) => {
      if (error.response?.status === 401) {
        queryClient.setQueryData(['me'], null);
      }
    },
    retry: false,
    enabled: !!authService.isAuthenticated(),
  });
}