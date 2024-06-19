import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Container from "@/components/wrappers/container";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/search-bar";

export default async function ProtectedPage() {
	return (
		<Container>
			<div className='flex flex-col flex-1 gap-4 items-center w-full'>
				<div className='w-full'>
					<div className='py-3 font-bold text-center bg-gradient-to-r from-green-100 to-green-200'>
						Benvenuto in InRegalo, il posto dove gestire i tuoi regali
					</div>
					<nav className='flex justify-center w-full h-16 border-b border-b-foreground/10'>
						<div className='flex justify-between items-center p-3 w-full max-w-4xl text-sm'>
							<Link
								prefetch={false}
								href='/protected'
								className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-500'
							>
								InRegalo
							</Link>
							<AuthButton />
						</div>
					</nav>
				</div>

				{/* SEZIONE ANNUNCI */}

				<div className='flex flex-col items-center gap-20 px-3 w-full animate-in mb-auto'>
					<div className='p-4 border-2 border-zinc-200 rounded-md w-full'>
						<div className='flex gap-4 w-full'>
							<Link
								prefetch={false}
								href='/nuovo_annuncio'
								className='flex flex-1'
							>
								<Button
									variant='outline'
									size='xl'
									className='flex-1 w-full text-green-500 hover:text-green-600 border-green-500 hover:bg-green-100 font-bold '
								>
									Inserisci annuncio
								</Button>
							</Link>
							<Link
								prefetch={false}
								href='/nuovo_annuncio'
								className='flex flex-1'
							>
								<Button
									size='xl'
									variant='outline'
									className='flex-1 text-green-500 hover:text-green-600 border-green-500 hover:bg-green-100 font-bold'
								>
									Preferiti
								</Button>
							</Link>
							<Link
								prefetch={false}
								href='/nuovo_annuncio'
								className='flex flex-1'
							>
								<Button
									size='xl'
									variant='outline'
									className='flex-1 text-green-500 hover:text-green-600 border-green-500 hover:bg-green-100 font-bold'
								>
									Messaggi
								</Button>
							</Link>
							<Link
								prefetch={false}
								href='/miei_annunci'
								className='flex flex-1'
							>
								<Button
									size='xl'
									variant='outline'
									className='flex-1 text-green-500 hover:text-green-600 border-green-500 hover:bg-green-100 font-bold'
								>
									Miei annunci
								</Button>
							</Link>
						</div>
					</div>
					<SearchBar />
					<div className='flex flex-col gap-4 w-full justify-center items-center'>
						<h1 className='text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500'>
							Dai via quello che non vuoi +
						</h1>
					</div>
				</div>

				{/* FOOTER */}

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
