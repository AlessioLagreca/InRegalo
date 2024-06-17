import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { signOut } from "@/app/actions/signOut";

export default async function AuthButton() {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return user ? (
		<div className='flex gap-4 items-center'>
			Hey, {user.email}!
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
