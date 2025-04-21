import "@/styles/globals.css";
import "@uploadthing/react/styles.css";

import { Toaster } from "@/components/ui/sonner"
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import { NavBar } from "./_components/navbar";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

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
	modal,
  }: {
	children: React.ReactNode;
	modal: React.ReactNode;
  }) {
	return (
		<ClerkProvider>
		<html lang="en" className={`${geist.variable}`}>
			<NextSSRPlugin
			/**
			 * The `extractRouterConfig` will extract **only** the route configs
			 * from the router to prevent additional information from being
			 * leaked to the client. The data passed to the client is the same
			 * as if you were to fetch `/api/uploadthing` directly.
			 */
			routerConfig={extractRouterConfig(ourFileRouter)}
			/>
					<body className="min-h-screen dark">
					<div className="grid h-screen grid-rows-[auto,1fr]">
						<NavBar />
						<main className="overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]">{children}</main>
						{modal}
					</div>
						<div id="modal-root"></div>
						<Toaster />
					</body>
		</html>
		</ClerkProvider>
	);
}
