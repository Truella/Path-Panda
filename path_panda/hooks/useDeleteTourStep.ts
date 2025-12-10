import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTourStep } from '../lib/api/tours';
import { TOURS_QUERY_KEY } from './useTours';
import { getTourQueryKey } from './useTour';
import { toast } from 'sonner';

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
      toast.success('Step deleted successfully', {
        description: 'The step has been removed from the tour.'
      });
    },
    onError: (error) => {
      toast.error('Failed to delete step', {
        description: error.message || 'An unexpected error occurred. Please try again.'
      });
    },
  });
}