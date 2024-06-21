import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function SelectCat() {
	return (
		<Select>
			<SelectTrigger className='max-w-2xl p-4 py-6 hover:border-gray-400'>
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
}
