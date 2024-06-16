import { createClient } from "@/utils/supabase/client";

export async function searchAnnunci(query: string) {
	const supabase = createClient();
	const { data, error } = await supabase
		.from("Annunci")
		.select()
		.textSearch("description", query);

	if (error) {
		console.error("Search error:", error);
		return [];
	}
	return data;
}
