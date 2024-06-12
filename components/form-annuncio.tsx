"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "./ui/textarea";
import { createClient } from "@/utils/supabase/client";
import { Toaster, toast } from "sonner";
import ProvaImmagine from "./prova-immagine";
import { useState } from "react";
import ProvaImmagine2 from "./prova-immagine2";

const formSchema = z.object({
	titolo: z.string().min(2).max(50),
	descrizione: z.string().min(2).max(500),
	categoria: z.string().min(2).max(50),
	immagine: z.string().min(2).max(200),
});

export default function FormAnnuncio() {
	const [file, setFile] = useState<File | undefined>(undefined);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	// 1. Definiamo il form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			titolo: "",
			descrizione: "",
			categoria: "",
		},
	});
	// Creiamo il client supabase.
	const supabase = createClient();

	// Funzione per gestire l'immagine
	const handleImmagine = async (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedFile(event.target.files?.[0] || null);
	};

	const uploadFileToS3 = async (file: File) => {
		const formData = new FormData();
		formData.append("file", file);

		const response = await fetch("/api/s3-upload", {
			method: "POST",
			body: formData,
		});

		if (response.ok) {
			const result = await response.json();
			return result.url;
		} else {
			console.error("Errore durante il caricamento dell'immagine");
		}
	};

	// 2. DEFINIAMO IL SUBMIT HANDLER.
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		if (selectedFile) {
			const result = await uploadFileToS3(selectedFile);
			values.immagine = result;
		}

		// something here
		supabase
			.from("Annunci")
			.insert({
				title: values.titolo,
				description: values.descrizione,
				category: values.categoria,
			})
			.then((response) => {
				if (response.error) {
					console.error(
						"Errore durante l'inserimento delle informazioni nel database:",
						response.error
					);
					toast.error(
						"Errore durante l'inserimento delle informazioni nel database:" +
							response.error
					);
				} else {
					console.log("Inserimento effettuato con successo");
					toast.success("Inserimento effettuato con successo");
				}
			});
	};

	return (
		<>
			<Toaster richColors />
			<div className='flex flex-col flex-1 gap-20 px-3 w-[700px] opacity-01 animate-in'>
				<Form {...form}>
					{/* handleSubmit è una funzione che gestisce il submit del form e passa alla funzione onSubmit
					i valori degli input del form, salvati poi nella variabile values */}
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
										<Textarea
											required
											className='h-[200px]'
											placeholder='Descrizione'
											{...field}
										/>
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
									<FormLabel>Categoria</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<SelectTrigger>
											<SelectValue placeholder='Tutte le categorie' />
										</SelectTrigger>

										<SelectContent>
											<SelectItem value='tutte le categorie'>
												Tutte le categorie
											</SelectItem>
											<SelectItem value='elettronica'>Elettronica</SelectItem>
											<SelectItem value='libri'>Libri</SelectItem>
											<SelectItem value='musica'>Musica</SelectItem>
											<SelectItem value='sport'>Sport</SelectItem>
											<SelectItem value='tempo libero'>Tempo libero</SelectItem>
										</SelectContent>
									</Select>
									<FormDescription>Categoria dell'annuncio</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='immagine'
							render={({ field: { onChange, value, ...fieldProps } }) => (
								<FormItem>
									<FormLabel>Immagine</FormLabel>

									{/* <Input type='file' {...field} /> */}
									<ProvaImmagine2
										onChange={handleImmagine}
										value={value}
										{...fieldProps}
									/>
								</FormItem>
							)}
						/>

						<Button onClick={() => form.handleSubmit(onSubmit)} type='submit'>
							Submit
						</Button>
					</form>
				</Form>
			</div>
		</>
	);
}
