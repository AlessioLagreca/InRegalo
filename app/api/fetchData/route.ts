import type { NextApiRequest, NextApiResponse } from "next";
import { fetchData } from "@/components/fetchServer";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const data = await fetchData();
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ message: "Errore nel recupero dei dati" });
	}
}
