import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useBestsellers = () => {
  return useQuery({
    queryKey: ['bestsellers'],
    queryFn: () => axios.get(`${process.env.API_URL}/api/BestSeller/`),
    select: ({ data }) => data,
  });
};
