"use client";

import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
	const [elementoRicerca, setElementoRicerca] = useState("");
	const [risultatoRIcerca, setRisultatoRicerca] = useState<any[]>([]);
	const supabase = createClient();
	// definiamo il router, sempre nel body del componente
	const router = useRouter();

	const gestisciRicerca = async (
		event: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (event.key === "Enter") {
			const { data, error } = await supabase
				.from("Annunci")
				.select()
				.textSearch("description", elementoRicerca);

			// do something with data
			console.log(data);
			setRisultatoRicerca(data || []);

			router.push("/ricerca");
		}
	};

	return (
		<Input
			onChange={(e) => setElementoRicerca(e.target.value)}
			onKeyDown={gestisciRicerca}
			type='text'
			placeholder='Cerca annunci'
			className='border-2 border-zinc-300 rounded-3xl max-w-2xl w-full py-6 text-lg focus:outline-none focus:ring-2 focus-visible:outline-none focus:ring-gray-300'
		/>
	);
}
