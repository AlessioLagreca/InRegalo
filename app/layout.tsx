import { GeistSans } from "geist/font/sans";
import { RicercaProvider } from "@/components/wrappers/RicercaContext";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "InRegalo",
	description: "InRegalo, regala agli altri ciò che non usi più!",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className={GeistSans.className}>
			<body>
				<RicercaProvider>
					<div className='mx-auto max-w-4xl'>{children}</div>
				</RicercaProvider>
			</body>
		</html>
	);
}
