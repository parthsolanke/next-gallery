import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { UploadButton } from "./upload-button";

export function NavBar() {
	return (
		<nav className="flex h-10 min-h-[60px] items-center justify-between p-4 font-semibold text-xl">
			<Link href="/">Gallery</Link>
			<div className="flex flex-row items-center gap-4">
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
