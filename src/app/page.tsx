export const dynamic = "force-dynamic";

import { index } from "drizzle-orm/gel-core";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/server/db"
import { SignedOut, SignedIn } from "@clerk/nextjs"
import { getMyImages } from "@/server/queries";
import { ImageCard } from "./_components/image-card";

async function Images() {
  const images = await getMyImages();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 pt-0">
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
