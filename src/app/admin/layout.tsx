import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <Navbar />
            <div className="p-4">
                {children}
            </div>
        </>
    )
}

function Navbar() {
    return (
        <header className="flex flex-row items-center justify-between w-full h-16 shadow-md p-4">
            <div className="flex flex-row items-center gap-4 justify-center">
                <div className="text-xl font-bold">LMS</div>
                <Badge className="">Admin</Badge>
            </div>
            <nav className="flex flex-row items-center">
                <Link className="text-sm font-medium hover:underline" href={'/'}>Home</Link>
                <SignedIn>
                </SignedIn>

                <Link className="text-sm font-medium ml-4 hover:underline" href={'/admin/courses'}>Courses</Link>

                <Link className="text-sm font-medium ml-4 hover:underline" href={'admin/products'}>Products</Link>
                <Link className="text-sm font-medium ml-4 hover:underline" href={'admin/sales'}>Sales</Link>


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
