import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createApi } from '../services/createApi.js';

const cartApi = createApi('cart');

export const useCart = (cartId) => {
  const queryClient = useQueryClient();

  const { data: cart, isLoading, isError, error } = useQuery({
    queryKey: ['cart', cartId],
    queryFn: async () => {
      let id = cartId || localStorage.getItem('cartId');
      if (id) {
        try {
          return await cartApi.get(id);
        } catch (error) {
          console.error("Error fetching cart:", error);
          localStorage.removeItem('cartId');
          return null;
        }
      } else {
        return null;
      }
    },
    enabled: !!cartId || !!localStorage.getItem('cartId'),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const createCart = useMutation({
    mutationFn: async () => {
      return await cartApi.create({});
    },
    onSuccess: (data) => {
      localStorage.setItem('cartId', data.id);
      queryClient.setQueryData(['cart'], data);
    }
  });

  const addItem = useMutation({
    mutationFn: async (item) => {
      if (!cart) {
        await createCart.mutateAsync();
      }
      const id = cart ? cart.id : localStorage.getItem('cartId');
      return await cartApi.postMemberRoute(id, 'cart_items', { cart_id: id, ...item });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['cart', data.id], data);
      queryClient.invalidateQueries(['cart']);
    },
    onError: (error) => {
      console.error('Failed to add item to cart:', error);
    }
  });

  return { cart, addItem }
}