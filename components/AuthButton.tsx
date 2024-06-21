import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";

export default async function AuthButton() {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const signOut = async () => {
		"use server";

		const supabase = createClient();
		await supabase.auth.signOut();
		return redirect("/login");
	};

	return user ? (
		<div className='flex gap-4 items-center'>
			<span className='hidden sm:block'>Ciao, {user.email}</span>
			<form action={signOut}>
				<Button variant='outline'>Logout</Button>
			</form>
		</div>
	) : (
		<Link
			prefetch={false}
			href='/login'
			className='flex px-3 py-2 no-underline rounded-md bg-btn-background hover:bg-btn-background-hover'
		>
			Login
		</Link>
	);
}
