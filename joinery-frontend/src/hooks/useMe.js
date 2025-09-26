import { useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from "../services/authService.js";
import joineryClient from "../services/joineryClient.js";

export function useMe() {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      if (!authService.hasCredentials()) {
        return null;
      }

      try {
        const { data } = await joineryClient.get('/users/me');
        return data;
      } catch (error) {
        await authService.logout();
        queryClient.setQueryData(['me'], null);
        return null;
      }
    },
    retry: false,
    enabled: !!authService.hasCredentials(),
  });
}