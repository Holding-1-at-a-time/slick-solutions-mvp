import { SignedIn, SignedOut, SignInButton, useOrganization } from "@clerk/nextjs";
import Link from "next/link";

export function Navigation() {
    const { organization } = useOrganization();

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link href="/" className="text-white font-bold">
                                Slick Solutions
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <SignedIn>
                                    {organization ? (
                                        <>
                                            <Link href="/dashboard" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                                Dashboard
                                            </Link>
                                            <Link href="/assessments" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                                Assessments
                                            </Link>
                                            <Link href="/estimates" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                                Estimates
                                            </Link>
                                        </>
                                    ) : (
                                        <Link href="/select-org" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                            Select Organization
                                        </Link>
                                    )}
                                </SignedIn>
                                <SignedOut>
                                    <SignInButton mode="modal">
                                        <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                            Sign In
                                        </button>
                                    </SignInButton>
                                </SignedOut>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
