import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getTourEvents, 
  getSessionEvents, 
  trackTourEvent,
  getTourEventAnalytics 
} from '../lib/api/tour-events';
import { TourEvent } from '../types/tour';

// Query keys
export const getTourEventsQueryKey = (tourId: string) => ['tour-events', tourId];
export const getSessionEventsQueryKey = (sessionId: string) => ['session-events', sessionId];
export const getTourAnalyticsQueryKey = (tourId: string) => ['tour-analytics', tourId];

/**
 * Hook to fetch all events for a tour
 */
export function useTourEvents(tourId: string | undefined) {
  return useQuery<TourEvent[], Error>({
    queryKey: getTourEventsQueryKey(tourId!),
    queryFn: () => getTourEvents(tourId!),
    enabled: !!tourId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Hook to fetch events for a specific session
 */
export function useSessionEvents(sessionId: string | undefined) {
  return useQuery<TourEvent[], Error>({
    queryKey: getSessionEventsQueryKey(sessionId!),
    queryFn: () => getSessionEvents(sessionId!),
    enabled: !!sessionId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch tour event analytics
 */
export function useTourEventAnalytics(tourId: string | undefined) {
  return useQuery({
    queryKey: getTourAnalyticsQueryKey(tourId!),
    queryFn: () => getTourEventAnalytics(tourId!),
    enabled: !!tourId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to track tour events with optimistic updates
 */
export function useTrackTourEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: trackTourEvent,
    onSuccess: (data) => {
      // Invalidate and refetch tour events
      queryClient.invalidateQueries({ 
        queryKey: getTourEventsQueryKey(data.tour_id) 
      });
      
      // Invalidate session events
      queryClient.invalidateQueries({ 
        queryKey: getSessionEventsQueryKey(data.session_id) 
      });
      
      // Invalidate analytics
      queryClient.invalidateQueries({ 
        queryKey: getTourAnalyticsQueryKey(data.tour_id) 
      });
    },
  });
}