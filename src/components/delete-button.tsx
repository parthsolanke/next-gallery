"use client";

import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { deleteImageAction } from "@/server/actions";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export function DeleteImageButton({ imageId }: { imageId: number }) {
	const router = useRouter();
	const [isDeleting, setIsDeleting] = React.useState(false);

	async function handleDelete() {
		try {
			setIsDeleting(true);
			const res = await deleteImageAction(imageId);

			if (res.success) {
				setIsDeleting(false);
				router.refresh();
				await new Promise((resolve) => setTimeout(resolve, 100));
				window.location.href = "/";
			}
		} catch (error) {
			setIsDeleting(false);
			console.error("Failed to delete:", error);
		}
	}

	return (
		<Button
			onClick={handleDelete}
			className="mt-2 cursor-pointer"
			variant="destructive"
			size="icon"
		>
			{isDeleting ? <LoadingSpinner /> : <Trash2 />}
		</Button>
	);
}
