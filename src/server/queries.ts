import "server-only";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";

export async function getMyImages() {
    const user = await auth()

    if (!user.userId) throw new Error("User not authenticated");

    const images = await db.query.images.findMany({
        where: (model, { eq }) => eq(model.createdById, user.userId),
        orderBy: (model, { desc }) => desc(model.id),
    });

    return images;
}

export async function getImageById(id: number) {
    const user = await auth()

    if (!user.userId) throw new Error("User not authenticated");

    const image = await db.query.images.findFirst({
        where: (model, { eq }) => eq(model.id, id),
    });

    if (!image) throw new Error("Image not found");

    if (image.createdById !== user.userId) throw new Error("User not authorized");

    return image;
}
