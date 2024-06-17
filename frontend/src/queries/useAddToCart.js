import { API_URL, axiosWithAuth } from '@/api/interceptors';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  const { mutate: addToCart, isPending } = useMutation({
    mutationKey: ['add to cart'],
    mutationFn: ({ good_id, count }) =>
      axiosWithAuth.post(`${API_URL}/api/Cart/`, { good_id, count }),
    onSuccess() {
      // toast.success('Товар был добавлен в корзину');
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
    },
    onError({ response }) {
      console.log(response);
      toast.error(response.data);
    },
  });
  return { addToCart, isPending };
};
