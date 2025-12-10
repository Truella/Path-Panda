import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTour } from '../lib/api/tours';
import { Tour } from '../types/tour';
import { TOURS_QUERY_KEY } from './useTours';
import { toast } from 'sonner';

type CreateTourInput = Omit<Tour, 'id' | 'created_at' | 'updated_at' | 'embed_key'>;

export function useCreateTour() {
  const queryClient = useQueryClient();

  return useMutation<Tour, Error, CreateTourInput>({
    mutationFn: (tour) => createTour(tour),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: TOURS_QUERY_KEY });
      toast.success('Tour created successfully', {
        description: `"${data.title}" is now live and ready to use.`
      });
    },
    onError: (error) => {
      toast.error('Failed to create tour', {
        description: error.message || 'An unexpected error occurred. Please try again.'
      });
    },
  });
}
