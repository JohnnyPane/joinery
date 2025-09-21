import { useQuery } from '@tanstack/react-query';
import { useAuth } from "../context/AuthContext.jsx";
import joineryClient from "../services/joineryClient.js";

export function useMe() {

  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const { data } = await joineryClient.get('/users/me');
      return data;
    },
    enabled: !!useAuth().isAuthenticated,
  });
}