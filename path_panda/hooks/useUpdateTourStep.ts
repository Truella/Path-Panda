import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTourStep } from '../lib/api/tours';
import { TourStep } from '../types/tour';
import { TOURS_QUERY_KEY } from './useTours';
import { getTourQueryKey } from './useTour';
import { toast } from 'sonner';

interface UpdateTourStepVariables {
  stepId: string;
  tourId: string;
  updates: Partial<Omit<TourStep, 'id' | 'tour_id' | 'created_at' | 'step_id'>>;
}

export function useUpdateTourStep() {
  const queryClient = useQueryClient();

  return useMutation<TourStep, Error, UpdateTourStepVariables>({
    mutationFn: ({ stepId, updates }) => updateTourStep(stepId, updates),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: getTourQueryKey(variables.tourId) });
      queryClient.invalidateQueries({ queryKey: TOURS_QUERY_KEY });
      toast.success('Step updated successfully', {
        description: `Step ${data.order} has been updated.`
      });
    },
    onError: (error) => {
      toast.error('Failed to update step', {
        description: error.message || 'An unexpected error occurred. Please try again.'
      });
    },
  });
}