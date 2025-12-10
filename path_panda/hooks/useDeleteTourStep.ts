import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTourStep } from '../lib/api/tours';
import { TOURS_QUERY_KEY } from './useTours';
import { getTourQueryKey } from './useTour';

interface DeleteTourStepVariables {
  stepId: string;
  tourId: string; // We need this to invalidate the correct tour query
}

export function useDeleteTourStep() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeleteTourStepVariables>({
    mutationFn: ({ stepId }) => deleteTourStep(stepId),
    onSuccess: (_, variables) => {
      // Invalidate the specific tour to refetch without deleted step
      queryClient.invalidateQueries({ queryKey: getTourQueryKey(variables.tourId) });
      // Invalidate tours list in case it displays step counts
      queryClient.invalidateQueries({ queryKey: TOURS_QUERY_KEY });
    },
  });
}