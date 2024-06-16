import { createContext, useContext, useState } from "react";
import { Annuncio } from "@/components/MieiAnnunci";

interface RicercaContextType {
	risultatiRicerca: Annuncio[];
	setRisultatiRicerca: (risultatiRicerca: Annuncio[]) => void;
}

const RicercaContext = createContext<RicercaContextType | null>(null);

export const useRicerca = () => useContext(RicercaContext);

export const RicercaProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [risultatiRicerca, setRisultatiRicerca] = useState<Annuncio[]>([]);

	return (
		<RicercaContext.Provider value={{ risultatiRicerca, setRisultatiRicerca }}>
			{children}
		</RicercaContext.Provider>
	);
};
