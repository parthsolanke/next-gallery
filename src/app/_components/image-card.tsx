"use client";

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface ImageCardProps {
	id: number;
	url: string;
	name: string;
}

export function ImageCard({ id, url, name }: ImageCardProps) {
	const [isLoading, setIsLoading] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		setIsLoading(false);
	}, [pathname]);

	return (
		<div className="group relative overflow-hidden bg-card">
			<div className="relative aspect-square">
				<Link href={`/img/${id}`} onClick={() => setIsLoading(true)}>
					<div className="relative h-full w-full">
						{isLoading && (
							<div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20">
								<LoadingSpinner className="size-8" />
							</div>
						)}
						<Image
							src={url}
							fill
							className="object-cover transition-opacity hover:opacity-90"
							alt={name}
						/>
					</div>
				</Link>
			</div>
			<div className="absolute bottom-0 w-full truncate bg-black/50 p-2 text-center text-sm">
				{name}
			</div>
		</div>
	);
}
