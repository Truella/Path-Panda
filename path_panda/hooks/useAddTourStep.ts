import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTourStep } from '../lib/api/tours';
import { TourStep } from '../types/tour';
import { TOURS_QUERY_KEY } from './useTours';
import { getTourQueryKey } from './useTour';

type AddTourStepInput = Omit<TourStep, 'id' | 'created_at'>;

export function useAddTourStep() {
  const queryClient = useQueryClient();

  return useMutation<TourStep, Error, AddTourStepInput>({
    mutationFn: (step) => addTourStep(step),
    onSuccess: (data) => {
      // Invalidate the specific tour to refetch with new step
      queryClient.invalidateQueries({ queryKey: getTourQueryKey(data.tour_id) });
      // Invalidate tours list in case it displays step counts
      queryClient.invalidateQueries({ queryKey: TOURS_QUERY_KEY });
    },
  });
}