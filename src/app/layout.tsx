import "@/styles/globals.css";
import "@uploadthing/react/styles.css";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { extractRouterConfig } from "uploadthing/server";
import { PostHogProvider } from "./_analytics/providers";
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
				<body className="dark flex h-screen flex-col">
					<PostHogProvider>
						<NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />

						<header className="sticky top-0 z-20">
							<NavBar />
						</header>

						<main className="scrollbar-width-none flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
							{children}
							{modal}
						</main>

						<div id="modal-root"></div>
						<Toaster />
					</PostHogProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
