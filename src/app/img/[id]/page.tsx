import FullImageView from "@/components/image-view";

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: photoId } = await params;
  const idASNumber = Number(photoId);
  if (isNaN(idASNumber)) throw new Error("Invalid photo ID");

  return <FullImageView id={idASNumber} />
}
