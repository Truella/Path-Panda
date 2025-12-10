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