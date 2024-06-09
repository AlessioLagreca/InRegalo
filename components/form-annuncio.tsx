"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "./ui/textarea";
import { Select } from "./ui/select";
import { SelectCategoria } from "./ui/select-categoria";

const formSchema = z.object({
	titolo: z.string().min(2).max(50),
	descrizione: z.string().min(2).max(500),
	categoria: z.string().min(2).max(50),
});

export default function FormAnnuncio() {
	// 1. Definiamo il form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			titolo: "",
		},
	});

	// 2. Definiamo il submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Fai qualcosa con i valori del form.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<div className='flex flex-col flex-1 gap-20 px-3 w-[700px] opacity-01 animate-in'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
					<FormField
						control={form.control}
						name='titolo'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Titolo</FormLabel>
								<FormControl>
									<Input required {...field} />
								</FormControl>
								<FormDescription>Titolo dell'annuncio</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='descrizione'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Descrizione</FormLabel>
								<FormControl>
									<Textarea required className='h-[200px]' placeholder='Descrizione' {...field} />
								</FormControl>
								<FormDescription>Descrizione dell'annuncio</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='categoria'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Descrizione</FormLabel>
								<FormControl>
									<SelectCategoria />
								</FormControl>
								<FormDescription>Descrizione dell'annuncio</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit'>Submit</Button>
				</form>
			</Form>
		</div>
	);
}
