export const dynamic = "force-dynamic";

import { index } from "drizzle-orm/gel-core";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/server/db"
import { SignedOut, SignedIn } from "@clerk/nextjs"
import { getMyImages } from "@/server/queries";

async function Images() {
	const images = await getMyImages();

	return (
		<div className="flex flex-wrap gap-4">
		{images.map((image) => (
				<div key={image.id} className="flex flex-col w-48">
					<Image
						src={image.url}
						alt="image"
						width={200}
						height={200}
						loading="lazy"
					/>
					<div>{image.name}</div>
				</div>
			))}
		</div>
	)
}

export default async function HomePage() {

	return (
		<main>
			<SignedOut>
				<div className="text-2xl w-full h-full text-center">
					Please sign in above to view the gallery.
				</div>
			</SignedOut>

			<SignedIn>
				<Images />
			</SignedIn>
		</main>
	);
}
