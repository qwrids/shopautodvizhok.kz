import { API_URL, axiosWithAuth } from '@/api/interceptors';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useDeleteFromCart = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteFromCart, isPending } = useMutation({
    mutationKey: ['delete from cart'],
    mutationFn: (id) => axiosWithAuth.delete(`${API_URL}/api/Cart/${id}`),
    onSuccess() {
      toast.success('Товар был удалён');
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
    },
    onError({ response }) {
      console.log(response);
      toast.error(response.data);
    },
  });
  return { deleteFromCart, isPending };
};
