import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTour } from '../lib/api/tours';
import { Tour } from '../types/tour';
import { TOURS_QUERY_KEY } from './useTours';
import { getTourQueryKey } from './useTour';
import { toast } from 'sonner';

interface UpdateTourVariables {
  tourId: string;
  updates: Partial<Omit<Tour, 'id' | 'created_at' | 'updated_at'>>;
}

export function useUpdateTour() {
  const queryClient = useQueryClient();

  return useMutation<Tour, Error, UpdateTourVariables>({
    mutationFn: ({ tourId, updates }) => updateTour(tourId, updates),
    onSuccess: (data, variables) => {
      // Invalidate the specific tour query
      queryClient.invalidateQueries({ queryKey: getTourQueryKey(variables.tourId) });
      // Invalidate tours list to reflect changes
      queryClient.invalidateQueries({ queryKey: TOURS_QUERY_KEY });
    },
    onError: (error) => {
      toast.error('Failed to update tour', {
        description: error.message || 'An unexpected error occurred. Please try again.'
      });
    },
  });
}