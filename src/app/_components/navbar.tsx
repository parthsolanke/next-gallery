import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import { UploadButton } from "./upload-button";
import Link from "next/link";

export function NavBar() {
    return (
        <nav className="flex justify-between items-center p-4 text-xl font-semibold h-10 min-h-[60px]">
            <Link href="/">Gallery</Link>
            <div className="flex flex-row gap-4 items-center">
                <SignedOut>
                    <SignInButton>
                        <button className="cursor-pointer">Sign in</button>
                    </SignInButton>
                </SignedOut>

                <SignedIn>
                    <div className="flex items-center gap-4">
                        <UploadButton /> 
                        <UserButton />
                    </div>
                </SignedIn>
            </div>
        </nav>
    );
}