import { GeistSans } from "geist/font/sans";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "https://qk8gsws.alessioprova.tokyo";

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
				<div className='mx-auto max-w-4xl'>{children}</div>
			</body>
		</html>
	);
}
