import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';

export const useProducts = (sort) => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => axios.get(`${process.env.API_URL}/api/Good/?ordering=${sort}`),
    select: ({ data }) => data,
  });
};
