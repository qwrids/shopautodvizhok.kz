import { axiosWithAuth } from '@/api/interceptors';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => axiosWithAuth.get(`${process.env.API_URL}/api/Cart/`),
    select: ({ data }) => data,
  });
};
