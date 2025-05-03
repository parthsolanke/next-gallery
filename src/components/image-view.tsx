import { getImageById } from "@/server/queries";
import { clerkClient } from "@clerk/nextjs/server";
import { DeleteImageButton } from "./delete-button";

export default async function FullImageView(props: {id: number}) {
  const image = await getImageById(props.id);
  const clerk = await clerkClient();
  const uploaderInfo = await clerk.users.getUser(image.createdById);
  
  return (
    <div className="flex flex-col md:flex-row h-full w-full max-w-7xl mx-auto gap-8 p-6 items-center justify-center min-h-screen">
      <div className="flex-1 min-h-[300px] flex items-center justify-center bg-black/20 overflow-hidden">
        <img
          src={image.url}
          alt={image.name}
          className="max-h-[80vh] w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col w-full md:w-1/3 p-2 items-center text-center">
        <h2 className="text-2xl font-bold text-white/90">{image.name}</h2>
        <div className="mt-auto">
          <p className="text-white/60 text-sm">
            Upload date: {new Date(image.createdAt).toLocaleDateString()}
          </p>
          <p className="text-white/60 text-sm">
            Uploaded by: {uploaderInfo.fullName}    
          </p>
          <DeleteImageButton imageId={image.id} />
        </div>
      </div>
    </div>
  );
}
