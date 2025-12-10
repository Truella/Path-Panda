import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTour } from '../lib/api/tours';
import { Tour } from '../types/tour';
import { TOURS_QUERY_KEY } from './useTours';
import { getTourQueryKey } from './useTour';

interface UpdateTourVariables {
  tourId: string;
  updates: Partial<Omit<Tour, 'id' | 'created_at' | 'updated_at' | 'embed_key' | 'user_id'>>;
}

export function useUpdateTour() {
  const queryClient = useQueryClient();

  return useMutation<Tour, Error, UpdateTourVariables>({
    mutationFn: ({ tourId, updates }) => updateTour(tourId, updates),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: getTourQueryKey(variables.tourId) });
      queryClient.invalidateQueries({ queryKey: TOURS_QUERY_KEY });
    },
  });
}