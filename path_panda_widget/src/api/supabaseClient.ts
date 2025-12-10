import { createClient } from "@supabase/supabase-js";

// Read from environment variables or hardcode for testing
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

if (!SUPABASE_URL || !SUPABASE_ANON) {
	console.error("Missing Supabase credentials");
}
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON, {
	auth: { persistSession: false },
});
