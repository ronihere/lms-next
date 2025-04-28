import Link from "next/link"
import { UserButton, SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
export default function layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

function Navbar() {
    return (
        <header className="flex flex-row items-center justify-between w-full h-16 shadow-md p-4">
            <div className="flex flex-row items-center">
                <div className="text-xl font-bold">LMS</div>
            </div>
            <nav className="flex flex-row items-center">
                <Link className="text-sm font-medium hover:underline" href={'/'}>Home</Link>
                <SignedIn>
                    <Link className="text-sm font-medium ml-4 hover:underline" href={'/courses'}>My Courses</Link>
                </SignedIn>
                <Link className="text-sm font-medium ml-4 hover:underline" href={'/purchases'}>Purchase History</Link>


                <SignedOut>
                    <Button variant={'link'} asChild>
                        <SignInButton></SignInButton>
                    </Button>
                </SignedOut>
                <SignedIn>
                    <Button variant={'link'} asChild>
                        <SignOutButton></SignOutButton>
                    </Button>
                </SignedIn>
                <div className="ml-4 h-10 w-10">
                    <UserButton appearance={{
                        elements: {
                            userButtonAvatarBox: { width: '100%', height: '100%' },
                        }
                    }} />
                </div>

            </nav>
        </header>
    )
}
