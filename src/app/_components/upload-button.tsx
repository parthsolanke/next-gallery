"use client";

import { useUploadThing } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { usePostHog } from "posthog-js/react";

// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", result);
    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.routeConfig?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

function UploadSVG() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
        </svg>
    )
}

export function UploadButton() {
    const router = useRouter();
    const posthog = usePostHog();
    
    const { inputProps } = useUploadThingInputProps("imageUploader", {
        onUploadBegin(fileName) {
            posthog.capture("upload_begin")
            toast(
                <div className="flex items-center gap-2 text-white">
                    <LoadingSpinner /> 
                    <span>Uploading {fileName}...</span>
                </div>,
                {
                    id: "uploading",
                    duration: Infinity,
                }
            );
        },
        onClientUploadComplete(res) {
            toast.dismiss("uploading");
            toast.success("Upload complete!");

            router.refresh();
        },
        onUploadError(error) {
            toast.dismiss("uploading");
            
            let errorMessage = "Upload failed! ";
            
            if (error.message === "Invalid config: FileCountMismatch") {
                errorMessage = "You can only upload up to 5 files at a time.";
            } else if (error.message === "Invalid config: FileSizeMismatch") {
                errorMessage = "Files must be smaller than 4MB.";
            } else {
                errorMessage += error.message;
            }
            
            toast.error(errorMessage);
        },
    });

    return (
        <div>
            <label htmlFor="upload-button" className="cursor-pointer">
                <UploadSVG />
            </label>
            <input type="file" id="upload-button" className="sr-only" { ...inputProps }/>
        </div>
    )
}