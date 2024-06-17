import { API_URL, axiosWithAuth } from '@/api/interceptors';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useUpdateCount = (setIsShow) => {
  const queryClient = useQueryClient();

  const { mutate: updateCount, isPending } = useMutation({
    mutationKey: ['update count'],
    mutationFn: ({ cart_id, count }) =>
      axiosWithAuth.put(`${API_URL}/api/Cart/${cart_id}/`, { count }),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
      setIsShow(false);
    },
    onError({ response }) {
      console.log(response);
      toast.error(response.data.name[0]);
    },
  });
  return { updateCount, isPending };
};
