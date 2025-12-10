import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTourStep } from '../lib/api/tours';
import { TOURS_QUERY_KEY } from './useTours';
import { getTourQueryKey } from './useTour';

interface DeleteTourStepVariables {
  stepId: string;
  tourId: string;
}

export function useDeleteTourStep() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeleteTourStepVariables>({
    mutationFn: ({ stepId }) => deleteTourStep(stepId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: getTourQueryKey(variables.tourId) });
      queryClient.invalidateQueries({ queryKey: TOURS_QUERY_KEY });
    }
  });
}