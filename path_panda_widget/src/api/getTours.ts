import { supabase } from "./supabaseClient";
import type { Tour } from "../types";

export async function getTour(embedKey: string): Promise<Tour> {
	// maybeSingle avoids PostgREST 406 when no row matches
	const { data, error } = await supabase
		.from("tours")
		.select(
			"id, title, description, embed_key, user_id, created_at, updated_at"
		)
		.eq("embed_key", embedKey)
		.limit(1)
		.maybeSingle();

	if (error) throw new Error(`Failed to fetch tour: ${error.message}`);
	if (!data) throw new Error("Tour not found for provided embed key");

	return data as Tour;
}
