import { axiosWithAuth } from '@/api/interceptors';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useOrderedProducts = () => {
  return useQuery({
    queryKey: ['order'],
    queryFn: () => axiosWithAuth.get(`${process.env.API_URL}/api/Order/`),
    select: ({ data }) => data,
  });
};
