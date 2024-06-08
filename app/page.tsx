import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import Link from "next/link";

export default async function Index() {
	return (
		<div className='flex flex-col flex-1 gap-20 items-center w-full'>
			<div className='w-full'>
				<div className='py-3 font-bold text-center bg-gradient-to-r from-green-100 to-green-200'>
					Benvenuto in InRegalo, il posto dove gestire i tuoi regali
				</div>
				<nav className='flex w-full h-16 border-b border-b-foreground/10'>
					<div className='flex justify-between items-center p-3 w-full text-sm'>
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
				<Header />
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
	);
}
