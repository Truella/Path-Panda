import { useQuery } from '@tanstack/react-query';
import { getAllTours } from '../lib/api/tours';
import { TourWithSteps } from '../types/tour';

export const TOURS_QUERY_KEY = ['tours'];

export function useTours() {
  return useQuery<TourWithSteps[], Error>({
    queryKey: TOURS_QUERY_KEY,
    queryFn: getAllTours,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}