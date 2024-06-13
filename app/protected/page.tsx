import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Container from "@/components/wrappers/container";
import { Button } from "@/components/ui/button";
import MieiAnnunci from "@/components/MieiAnnunci";

export default async function ProtectedPage() {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/login");
	}

	return (
		<Container>
			<div className='flex flex-col flex-1 gap-20 items-center w-full'>
				<div className='w-full'>
					<div className='py-3 font-bold text-center bg-gradient-to-r from-green-100 to-green-200'>
						Benvenuto in InRegalo, il posto dove gestire i tuoi regali
					</div>
					<nav className='flex justify-center w-full h-16 border-b border-b-foreground/10'>
						<div className='flex justify-between items-center p-3 w-full max-w-4xl text-sm'>
							<Link
								href='/protected'
								className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-500'
							>
								InRegalo
							</Link>
							<AuthButton />
						</div>
					</nav>
				</div>

				<div className='flex flex-col flex-1 gap-20 px-3 max-w-4xl opacity-01 animate-in'>
					<Link href='/nuovo_annuncio'>
						<Button className='bg-green-500 hover:bg-green-600 font-bold'>
							Inserisci annuncio
						</Button>
					</Link>
					<MieiAnnunci id={user?.id} />
					<p>Hello {user?.id}</p>
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
