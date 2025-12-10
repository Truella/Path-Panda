import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTourStep } from '../lib/api/tours';
import { TourStep } from '../types/tour';
import { TOURS_QUERY_KEY } from './useTours';
import { getTourQueryKey } from './useTour';
import { toast } from 'sonner';

type AddTourStepInput = Omit<TourStep, 'id' | 'created_at'>;

export function useAddTourStep() {
  const queryClient = useQueryClient();

  return useMutation<TourStep, Error, AddTourStepInput>({
    mutationFn: (step) => addTourStep(step),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: getTourQueryKey(data.tour_id) });
      queryClient.invalidateQueries({ queryKey: TOURS_QUERY_KEY });
      toast.success('Step added successfully', {
        description: `Step ${data.order} has been added to the tour.`
      });
    },
    onError: (error) => {
      toast.error('Failed to add step', {
        description: error.message || 'An unexpected error occurred. Please try again.'
      });
    },
  });
}