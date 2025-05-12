export const dynamic = "force-dynamic";

import { db } from "@/server/db";
import { getMyImages } from "@/server/queries";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { index } from "drizzle-orm/gel-core";
import Image from "next/image";
import Link from "next/link";
import { ImageCard } from "./_components/image-card";

async function Images() {
	const images = await getMyImages();

	return (
		<div className="grid grid-cols-2 gap-4 p-4 pt-0 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
			{images.map((image) => (
				<ImageCard
					key={image.id}
					id={image.id}
					url={image.url}
					name={image.name}
				/>
			))}
		</div>
	);
}

export default async function HomePage() {
	return (
		<main>
			<SignedOut>
				<div className="h-full w-full text-center text-2xl">
					Please sign in above to view the gallery.
				</div>
			</SignedOut>

			<SignedIn>
				<Images />
			</SignedIn>
		</main>
	);
}
