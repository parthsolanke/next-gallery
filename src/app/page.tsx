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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {images.map((image) => (
        <div key={image.id} className="group relative bg-card overflow-hidden">
          <div className="aspect-square relative">
            <Link href={`/img/${image.id}`}>
              <Image
                src={image.url}
                fill
                className="object-cover hover:opacity-90 transition-opacity"
                alt={image.name}
              />
            </Link>
          </div>
          <div className="p-2 text-sm truncate text-center bg-black/50 absolute bottom-0 w-full">
            {image.name}
          </div>
        </div>
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
