"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

export interface Annuncio {
	id: string;
	title: string;
	description: string;
	image: string;
	category: string;
	user_id: string;
}

interface Props {
	id: string;
}

const MieiAnnunci: React.FC<Props> = ({ id }) => {
	const [annunci, setAnnunci] = useState<Annuncio[]>([]);

	// Chiede i dati dell'utente appena il componente viene montato
	useEffect(() => {
		const fetchAnnunci = async () => {
			const supabase = createClient();
			const { data, error } = await supabase
				.from("Annunci")
				.select()
				.eq("user_id", id);

			if (error) {
				console.error("Error fetching annunci:", error);
			} else {
				setAnnunci(data);
				console.log(data);
			}
		};

		fetchAnnunci();
	}, []);

	return (
		<div>
			<h1 className='text-2xl font-bold mb-4'>I tuoi Annunci</h1>
			<div className='flex flex-wrap gap-8'>
				{annunci.map((annuncio) => (
					<div
						key={annuncio.id}
						className='cursor-pointer border border-input bg-background hover:bg-accent hover:text-accent-foreground items-center justify-center whitespace-nowrap rounded-md text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 p-4'
					>
						<Image
							src={annuncio.image}
							alt={annuncio.title}
							width={300}
							height={300}
						/>
						<h3 className='text-lg font-bold'>{annuncio.title}</h3>
						<p>{annuncio.description}</p>
						<p>Categoria: {annuncio.category}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default MieiAnnunci;
