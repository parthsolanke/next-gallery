import { getImageById } from "@/server/queries";
import { clerkClient } from "@clerk/nextjs/server";
import { DeleteImageButton } from "./delete-button";

export default async function FullImageView(props: { id: number }) {
	const image = await getImageById(props.id);
	const clerk = await clerkClient();
	const uploaderInfo = await clerk.users.getUser(image.createdById);

	return (
		<div className="mx-auto flex h-full min-h-screen w-full max-w-7xl flex-col items-center justify-center gap-8 p-6 md:flex-row">
			<div className="flex min-h-[300px] flex-1 items-center justify-center overflow-hidden bg-black/20">
				<img
					src={image.url}
					alt={image.name}
					className="h-full max-h-[80vh] w-full object-contain"
				/>
			</div>
			<div className="flex w-full flex-col items-center p-2 text-center md:w-1/3">
				<h2 className="font-bold text-2xl text-white/90">{image.name}</h2>
				<div className="mt-auto">
					<p className="text-sm text-white/60">
						Upload date: {new Date(image.createdAt).toLocaleDateString()}
					</p>
					<p className="text-sm text-white/60">
						Uploaded by: {uploaderInfo.fullName}
					</p>
					<DeleteImageButton imageId={image.id} />
				</div>
			</div>
		</div>
	);
}
