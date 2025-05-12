"use server";

import { db } from "@/server/db";
import { images } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";

const utApi = new UTApi();

export async function deleteImageAction(imageId: number) {
	const session = await auth();
	if (!session.userId) {
		return { error: "Unauthorized" };
	}

	const [image] = await db
		.select()
		.from(images)
		.where(and(eq(images.id, imageId), eq(images.createdById, session.userId)));

	if (!image) {
		return { error: "Image not found" };
	}

	const fileKey = image.url.split("/f/")[1];
	if (!fileKey) {
		return { error: "Invalid file key" };
	}

	const utapiResult = await utApi.deleteFiles([fileKey]);

	console.log("Deleted from UploadThing:", utapiResult);

	const dbDeleteResult = await db.delete(images).where(eq(images.id, imageId));

	console.log("Deleted from DB:", dbDeleteResult);

	return { success: true };
}
