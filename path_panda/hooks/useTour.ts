import { useQuery } from '@tanstack/react-query';
import { getTourById } from '../lib/api/tours';
import { TourWithSteps } from '../types/tour';

export const getTourQueryKey = (tourId: string) => ['tours', tourId];

export function useTour(tourId: string | undefined) {
  return useQuery<TourWithSteps | null, Error>({
    queryKey: getTourQueryKey(tourId!),
    queryFn: () => getTourById(tourId!),
    enabled: !!tourId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}