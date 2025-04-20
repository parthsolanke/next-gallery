import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import { NavBar } from "./_components/navbar";

export const metadata: Metadata = {
	title: "Next Gallery",
	description: "A simple gallery app",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ClerkProvider>
		<html lang="en" className={`${geist.variable}`}>
			<body >
				<NavBar />
				{children}
			</body>
		</html>
		</ClerkProvider>
	);
}
