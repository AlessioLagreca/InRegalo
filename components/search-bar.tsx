"use client";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";

export default function SearchBar() {
	const [elementoRicerca, setElementoRicerca] = useState("");

	const router = useRouter();

	const gestisciRicerca = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			const vecchioCookie = Cookies.get("query");
			console.log("elemento ricerca:", elementoRicerca);
			console.log("vecchio cookie:", vecchioCookie);
			if (vecchioCookie) {
				Cookies.remove("query");
				Cookies.set("query", elementoRicerca);
				window.location.href = "/ricerca";
			} else {
				Cookies.set("query", elementoRicerca);
				window.location.href = "/ricerca";
			}
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
