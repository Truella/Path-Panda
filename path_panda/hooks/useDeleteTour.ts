import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTour } from '../lib/api/tours';
import { TOURS_QUERY_KEY } from './useTours';
import { getTourQueryKey } from './useTour';

export function useDeleteTour() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (tourId) => deleteTour(tourId),
    onSuccess: (_, tourId) => {
      // Remove the specific tour from cache
      queryClient.removeQueries({ queryKey: getTourQueryKey(tourId) });
      // Invalidate tours list to refetch without deleted tour
      queryClient.invalidateQueries({ queryKey: TOURS_QUERY_KEY });
    },
  });
}
