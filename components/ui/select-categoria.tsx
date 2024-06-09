import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const SelectCategoria = () => (
	<Select>
		<SelectTrigger className='w-[180px]'>
			<SelectValue placeholder='Theme' />
		</SelectTrigger>
		<SelectContent>
			<SelectItem value='light'>Light</SelectItem>
			<SelectItem value='dark'>Dark</SelectItem>
			<SelectItem value='system'>System</SelectItem>
		</SelectContent>
	</Select>
);
