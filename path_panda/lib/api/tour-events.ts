import { supabase } from '../../db/supabaseClient';
import { TourEvent, TourEventMetadata } from '../../types/tour';

/**
 * Get all events for a specific tour
 */
export async function getTourEvents(tourId: string): Promise<TourEvent[]> {
  const { data, error } = await supabase
    .from('tour_events')
    .select('*')
    .eq('tour_id', tourId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

/**
 * Get events for a specific session
 */
export async function getSessionEvents(sessionId: string): Promise<TourEvent[]> {
  const { data, error } = await supabase
    .from('tour_events')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data || []
}

/**
 * Track a tour event
 */
export async function trackTourEvent(event: {
  tour_id: string
  step_id?: string | null
  event_type: 'started' | 'step_started' | 'step_completed' | 'skipped' | 'completed'
  session_id: string
  metadata?: TourEventMetadata | null
}): Promise<TourEvent> {
  const { data, error } = await supabase
    .from('tour_events')
    .insert([event])
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Get event analytics for a tour (aggregated data)
 */
export async function getTourEventAnalytics(tourId: string) {
  const { data, error } = await supabase
    .from('tour_events')
    .select('*')
    .eq('tour_id', tourId)

  if (error) throw error

  const events = data || []
  
  // Calculate analytics
  const totalSessions = new Set(events.map(e => e.session_id)).size
  const completedSessions = new Set(
    events.filter(e => e.event_type === 'completed').map(e => e.session_id)
  ).size
  const skippedSessions = new Set(
    events.filter(e => e.event_type === 'skipped').map(e => e.session_id)
  ).size

  // Step completion rates
  const stepEvents = events.filter(e => e.step_id)
  const stepStats = stepEvents.reduce((acc, event) => {
    if (!event.step_id) return acc
    
    if (!acc[event.step_id]) {
      acc[event.step_id] = { started: 0, completed: 0 }
    }
    
    if (event.event_type === 'step_started') acc[event.step_id].started++
    if (event.event_type === 'step_completed') acc[event.step_id].completed++
    
    return acc
  }, {} as Record<string, { started: number; completed: number }>)

  return {
    totalSessions,
    completedSessions,
    skippedSessions,
    completionRate: totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0,
    skipRate: totalSessions > 0 ? (skippedSessions / totalSessions) * 100 : 0,
    stepStats,
  }
}