// src/types/index.ts

export interface Tour {
	id: string;
	title: string;
	description: string | null;
	embed_key: string;
	user_id: string;
	created_at?: string;
	updated_at?: string;
}

export interface TourStep {
	id: string;
	tour_id: string;
	title: string;
	content: string ;
	selector: string;
	order: number;
	position: "top" | "bottom" | "left" | "right" | "center";
	created_at?: string;
}

export interface TourEvent {
	tour_id: string;
	step_id: string;
	event_type:
		| "step_started"
		| "step_completed"
		| "step_skipped"
		| "tour_completed"
		| "tour_exited"
		| "step_start"
		| "next"
		| "back"
		| "skip";
	session_id: string;
	metadata?: Record<string, any>;
}

export interface TourState {
	currentStepIndex: number;
	steps: TourStep[];
	tour: Tour;
	sessionId: string;
	isActive: boolean;
}

export interface ElementPosition {
	top: number;
	left: number;
	width: number;
	height: number;
}
