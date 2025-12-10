import { useQuery } from '@tanstack/react-query';
import { getTourEventAnalytics } from '../lib/api/tour-events';
import { TourWithSteps } from '../types/tour';

export function useAllTourAnalytics(tours: TourWithSteps[] | undefined) {
  return useQuery({
    queryKey: ['all-tour-analytics', tours?.map((t) => t.id)],
    queryFn: async () => {
      if (!tours || tours.length === 0) return [];
      const results = await Promise.all(
        tours.map(async (tour) => {
          const analytics = await getTourEventAnalytics(tour.id);
          return { tourId: tour.id, analytics };
        }),
      );
      return results;
    },
    enabled: !!tours && tours.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
