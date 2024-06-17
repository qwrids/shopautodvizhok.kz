import { API_URL, axiosWithAuth } from '@/api/interceptors';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useOrder = (setIsShow) => {
  const queryClient = useQueryClient();

  const { mutate: order, isPending } = useMutation({
    mutationKey: ['order'],
    mutationFn: ({ carts, address, phone, first_name, last_name, payment_method, city }) =>
      axiosWithAuth.post(`${API_URL}/api/Order/`, {
        carts,
        address,
        phone,
        first_name,
        last_name,
        payment_method,
        city,
      }),
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
  return { order, isPending };
};
