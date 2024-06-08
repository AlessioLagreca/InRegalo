"use client";

import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Container from "@/components/wrappers/container";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
	username: z.string().min(2).max(50),
});

export default async function ProtectedPage() {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/login");
	}

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<Container>
			<div className='flex flex-col flex-1 gap-20 items-center w-full'>
				<div className='w-full'>
					<nav className='flex justify-center w-full h-16 border-b border-b-foreground/10'>
						<div className='flex justify-between items-center p-3 w-full max-w-4xl text-sm'>
							<Link
								href='/'
								className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-500'
							>
								InRegalo
							</Link>
							<AuthButton />
						</div>
					</nav>
				</div>

				<div className='flex flex-col flex-1 gap-20 px-3 max-w-4xl opacity-01 animate-in'>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
							<FormField
								control={form.control}
								name='username'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input placeholder='shadcn' {...field} />
										</FormControl>
										<FormDescription>This is your public display name.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type='submit'>Submit</Button>
						</form>
					</Form>
				</div>

				<footer className='flex justify-center p-8 w-full text-xs text-center border-t border-t-foreground/10'>
					<p>
						Powered by{" "}
						<a
							href='https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs'
							target='_blank'
							className='font-bold hover:underline'
							rel='noreferrer'
						>
							Supabase
						</a>
					</p>
				</footer>
			</div>
		</Container>
	);
}
