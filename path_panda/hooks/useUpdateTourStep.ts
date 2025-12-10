import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTourStep } from '../lib/api/tours';
import { TourStep } from '../types/tour';
import { TOURS_QUERY_KEY } from './useTours';
import { getTourQueryKey } from './useTour';

interface UpdateTourStepVariables {
  stepId: string;
  tourId: string;
  updates: Partial<Omit<TourStep, 'id' | 'tour_id' | 'created_at'>>;
}

export function useUpdateTourStep() {
  const queryClient = useQueryClient();

  return useMutation<TourStep, Error, UpdateTourStepVariables>({
    mutationFn: ({ stepId, updates }) => updateTourStep(stepId, updates),
    onSuccess: (data, variables) => {
      // Invalidate the specific tour to refetch with updated step
      queryClient.invalidateQueries({ queryKey: getTourQueryKey(variables.tourId) });
      // Invalidate tours list in case it displays step data
      queryClient.invalidateQueries({ queryKey: TOURS_QUERY_KEY });
    },
  });
}