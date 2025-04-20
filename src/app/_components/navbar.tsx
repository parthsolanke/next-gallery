import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";

export function NavBar() {
    return (
        <nav className="flex justify-between items-center p-4 mb-6 border-b text-xl font-semibold">
            <div>Gallery</div>
            <div>
                <SignedOut>
                    <SignInButton />
                </SignedOut>

                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    );
}