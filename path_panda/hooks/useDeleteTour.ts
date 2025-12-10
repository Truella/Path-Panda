import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTour } from '../lib/api/tours';
import { TOURS_QUERY_KEY } from './useTours';
import { getTourQueryKey } from './useTour';

export function useDeleteTour() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (tourId) => deleteTour(tourId),
    onSuccess: (_, tourId) => {
      queryClient.removeQueries({ queryKey: getTourQueryKey(tourId) });
      queryClient.invalidateQueries({ queryKey: TOURS_QUERY_KEY });
      // Note: Toast is handled in the component to include tour title
    },
    onError: (error) => {
      // Note: Toast is handled in the component for better context
    },
  });
}
