import { supabase } from "./supabaseClient";
import type { TourEvent } from "../types";

export async function recordEvent(event: TourEvent): Promise<void> {
	const { error } = await supabase.from("tour_events").insert([
		{
			tour_id: event.tour_id,
			step_id: event.step_id,
			event_type: event.event_type,
			session_id: event.session_id,
			metadata: event.metadata || {},
		},
	]);

	if (error) {
		console.warn("Event log failed:", error.message);
	}
}
