export interface Tour {
  id: string
  user_id: string
  title: string
  description: string | null
  embed_key?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface TourStep {
  id: string
  tour_id: string
  step_id: string
  title: string
  content: string
  selector: string
  order: number
  position: string
  created_at: string | null
}

export interface TourAnalytics {
  id: string
  tour_id: string
  user_id: string
  completed: boolean
  steps_completed: number
  started_at: string
  completed_at?: string
}

// Combined type for tour with steps
export interface TourWithSteps extends Tour {
  steps: TourStep[]
}

export interface TourEventMetadata {
  userAgent?: string;
  referrer?: string;
  device?: string;
  browser?: string;
  screenWidth?: number;
  screenHeight?: number;
  timeSpent?: number;
  totalTime?: number;
  stoppedAtStep?: number;
  reason?: string;
  clickCoordinates?: { x: number; y: number };
  customProperties?: Record<string, string | number | boolean>;
  [key: string]: string | number | boolean | undefined | Record<string, string | number | boolean>;
}

export interface TourEvent {
  id: string;
  tour_id: string;
  step_id: string | null;
  event_type: 'started' | 'step_started' | 'step_completed' | 'skipped' | 'completed';
  session_id: string;
  metadata: TourEventMetadata | null;
  created_at: string;
}