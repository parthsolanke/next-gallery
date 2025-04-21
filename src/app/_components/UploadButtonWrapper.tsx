'use client'

import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";

export const UploadButtonWrapper = () => {
    const router = useRouter();

    return (
        <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
                router.refresh();
            }}
            onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
            }}
            appearance={{
                button: "h-9 px-4 py-2 text-sm font-medium",
            }}
        />
    );
};