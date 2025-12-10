import { useCallback, useEffect, useRef } from 'react';
import { useTrackTourEvent } from './useTourEvents';
import { TourEventMetadata } from '../types/tour';

/**
 * Hook to easily track tour events throughout the tour lifecycle
 * Automatically generates and maintains a session ID
 */
export function useTourEventTracker(tourId: string | undefined) {
  const { mutate: trackEvent } = useTrackTourEvent();
  const sessionIdRef = useRef<string>(crypto.randomUUID());
  const tourStartedRef = useRef(false);

  // Get session ID - memoized so it doesn't change
  const getSessionId = useCallback(() => sessionIdRef.current, []);

  // Start tour event
  const startTour = useCallback((metadata?: TourEventMetadata) => {
    if (!tourId || tourStartedRef.current) return;
    
    trackEvent({
      tour_id: tourId,
      event_type: 'started',
      session_id: sessionIdRef.current,
      metadata,
    });
    
    tourStartedRef.current = true;
  }, [tourId, trackEvent]);

  // Step started event
  const startStep = useCallback((stepId: string, metadata?: TourEventMetadata) => {
    if (!tourId) return;
    
    trackEvent({
      tour_id: tourId,
      step_id: stepId,
      event_type: 'step_started',
      session_id: sessionIdRef.current,
      metadata,
    });
  }, [tourId, trackEvent]);

  // Step completed event
  const completeStep = useCallback((stepId: string, metadata?: TourEventMetadata) => {
    if (!tourId) return;
    
    trackEvent({
      tour_id: tourId,
      step_id: stepId,
      event_type: 'step_completed',
      session_id: sessionIdRef.current,
      metadata,
    });
  }, [tourId, trackEvent]);

  // Skip tour event
  const skipTour = useCallback((metadata?: TourEventMetadata) => {
    if (!tourId) return;
    
    trackEvent({
      tour_id: tourId,
      event_type: 'skipped',
      session_id: sessionIdRef.current,
      metadata,
    });
  }, [tourId, trackEvent]);

  // Complete tour event
  const completeTour = useCallback((metadata?: TourEventMetadata) => {
    if (!tourId) return;
    
    trackEvent({
      tour_id: tourId,
      event_type: 'completed',
      session_id: sessionIdRef.current,
      metadata,
    });
  }, [tourId, trackEvent]);

  return {
    getSessionId,
    startTour,
    startStep,
    completeStep,
    skipTour,
    completeTour,
  };
}

/**
 * Hook that automatically tracks tour start when component mounts
 */
export function useAutoTrackTourStart(
  tourId: string | undefined,
  enabled: boolean = true,
  metadata?: TourEventMetadata
) {
  const { startTour } = useTourEventTracker(tourId);

  useEffect(() => {
    if (enabled && tourId) {
      startTour(metadata);
    }
  }, [tourId, enabled]);

  return null;
}