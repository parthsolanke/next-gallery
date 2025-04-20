import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
	title: "Next Gallery",
	description: "A simple gallery app",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

function NavBar() {
	return (
		<nav className="flex justify-between items-center p-4 mb-6 border-b text-xl font-semibold">
			<div>Gallery</div>
			<div>Sign In</div>
		</nav>
	);
}

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`${geist.variable}`}>
			<body >
				<NavBar />
				{children}
			</body>
		</html>
	);
}
