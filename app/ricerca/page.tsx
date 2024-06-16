import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect, useParams } from "next/navigation";
import Link from "next/link";
import Container from "@/components/wrappers/container";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function ProtectedPage() {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/login");
	}

	// recupero il valore della ricerca dai cookie e chiamo il database per cercare gli annunci che corrispondono alla ricerca

	const query = cookies().get("query");

	const { data, error } = await supabase
		.from("Annunci")
		.select()
		.textSearch("description", query?.value || "");

	return (
		<Container>
			<div className='flex flex-col flex-1 gap-8 items-center w-full'>
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

				<div className='flex flex-col flex-1 items-center gap-20 px-3 max-w-4xl opacity-01 animate-in w-full'>
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
								href='/nuovo_annuncio'
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
				</div>

				{/* RISULTATI RICERCA */}

				{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

				{data?.map((annuncio) => (
					<div
						key={annuncio.id}
						className='cursor-pointer border border-input bg-background hover:bg-accent hover:text-accent-foreground items-center justify-center whitespace-nowrap rounded-md text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 p-4'
					>
						<Image
							src={annuncio.image}
							alt={annuncio.title}
							width={300}
							height={300}
						/>
						<h3 className='text-lg font-bold'>{annuncio.title}</h3>
						<p>{annuncio.description}</p>
						<p>Categoria: {annuncio.category}</p>
					</div>
				))}

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
