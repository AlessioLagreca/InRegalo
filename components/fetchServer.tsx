// This is a server component
import { createClient } from "@/utils/supabase/client";
import Cookies from "js-cookie";

export async function fetchData() {
	const supabase = createClient();
	const query = Cookies.get("query");
	const { data, error } = await supabase
		.from("Annunci")
		.select()
		.textSearch("description", query || "");
	if (error) {
		throw new Error(error.message);
	}
	return data;
}
