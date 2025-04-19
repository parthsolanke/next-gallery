import { index } from "drizzle-orm/gel-core";
import Link from "next/link";
import Image from "next/image";

const mockUrls = [
	"https://4uxz46kpzp.ufs.sh/f/Z16cUGgPyvHnvZO5DocFqoGUiNPkrdsOV4hn7XgM5WbQSxC3",
	"https://4uxz46kpzp.ufs.sh/f/Z16cUGgPyvHnvY2JiVcFqoGUiNPkrdsOV4hn7XgM5WbQSxC3",
	"https://4uxz46kpzp.ufs.sh/f/Z16cUGgPyvHn1Abmsb2FMbBc2Eu5KWpv7GXDw4zLsrgeQ6kI",
]

const mockImages = mockUrls.map((url, index) => ({
	id: index + 1,
	url: url,
}));

export default function HomePage() {
	return (
		<main>
			<div className="flex flex-wrap gap-4">
				{[ ...mockImages, ...mockImages, ...mockImages, ...mockImages].map((image, index) => (
						<div key={image.id + '-' + index} className="w-48">
							<Image
								src={image.url}
								alt="image"
								width={200}
								height={200}
								loading="lazy"
							/>
						</div>
					))}
			</div>
		</main>
	);
}
