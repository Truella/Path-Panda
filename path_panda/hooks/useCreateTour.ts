import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTour } from '../lib/api/tours';
import { Tour } from '../types/tour';
import { TOURS_QUERY_KEY } from './useTours';

type CreateTourInput = Omit<Tour, 'id' | 'created_at' | 'updated_at' | 'embed_key'>;

export function useCreateTour() {
  const queryClient = useQueryClient();

  return useMutation<Tour, Error, CreateTourInput>({
    mutationFn: (tour) => createTour(tour),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: TOURS_QUERY_KEY });
    },
  });
}
