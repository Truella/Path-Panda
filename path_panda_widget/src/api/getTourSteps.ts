import { supabase } from "./supabaseClient";
import type { TourStep } from "../types";

export async function getTourSteps(tourId: string): Promise<TourStep[]> {
	const { data, error } = await supabase
		.from("tour_steps")
		.select("*")
		.eq("tour_id", tourId)
		.order("order", { ascending: true });

	if (error) throw new Error(`Failed to fetch tour steps: ${error.message}`);
	if (!data || data.length === 0) throw new Error("No steps found for tour");

	return data as TourStep[];
}
