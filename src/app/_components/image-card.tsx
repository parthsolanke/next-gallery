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
    <div className="group relative bg-card overflow-hidden">
      <div className="aspect-square relative">
        <Link 
          href={`/img/${id}`}
          onClick={() => setIsLoading(true)}
        >
          <div className="w-full h-full relative">
            {isLoading && (
              <div className="absolute inset-0 bg-black/20 z-10 flex items-center justify-center">
                <LoadingSpinner className="size-8" />
              </div>
            )}
            <Image
              src={url}
              fill
              className="object-cover hover:opacity-90 transition-opacity"
              alt={name}
            />
          </div>
        </Link>
      </div>
      <div className="p-2 text-sm truncate text-center bg-black/50 absolute bottom-0 w-full">
        {name}
      </div>
    </div>
  );
}
