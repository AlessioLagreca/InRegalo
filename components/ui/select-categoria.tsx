import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FieldValues } from "react-hook-form";

export const SelectCategoria = ({ ...field }: { field: FieldValues }) => {
	return (
		<Select {...field}>
			<SelectTrigger className='w-[280px]'>
				<SelectValue placeholder='Tutte le categorie' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='tutte le categorie'>Tutte le categorie</SelectItem>
				<SelectItem value='elettronica'>Elettronica</SelectItem>
				<SelectItem value='libri'>Libri</SelectItem>
				<SelectItem value='musica'>Musica</SelectItem>
				<SelectItem value='sport'>Sport</SelectItem>
				<SelectItem value='tempo libero'>Tempo libero</SelectItem>
			</SelectContent>
		</Select>
	);
};
