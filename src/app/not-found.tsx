// app/not-found.tsx
import { Slot } from "@/components/Slot";
import Link from "next/link";

export default function NotFound() {
	return (
		<>
			<main className="flex h-full flex-col items-center justify-center p-8">
				<h1 className="mb-4 font-semibold text-4xl">Page Not Found</h1>
				<p className="mb-6 text-lg">
					Oops—this page doesn’t exist. Try heading back home.
				</p>
				<Link href="/" className="rounded border px-4 py-2">
					Return to Gallery
				</Link>
			</main>
			<Slot name="modal" />
		</>
	);
}
