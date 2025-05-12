import FullImageView from "@/components/image-view";
import { Modal } from "./modal";

export default async function PhotoModal({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id: photoId } = await params;
	const idASNumber = Number(photoId);
	if (isNaN(idASNumber)) throw new Error("Invalid photo ID");

	return (
		<Modal>
			<FullImageView id={idASNumber} />
		</Modal>
	);
}
