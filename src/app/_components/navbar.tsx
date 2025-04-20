import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import { UploadButtonWrapper } from "./UploadButtonWrapper";

export function NavBar() {
    return (
        <nav className="flex justify-between items-center p-4 mb-6 border-b text-xl font-semibold">
            <div>Gallery</div>
            <div>
                <SignedOut>
                    <SignInButton />
                </SignedOut>

                <SignedIn>
                    <div className="flex items-center gap-4">
                        <UploadButtonWrapper />
                        <UserButton />
                    </div>
                </SignedIn>
            </div>
        </nav>
    );
}