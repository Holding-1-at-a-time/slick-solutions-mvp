import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          Slick Solutions
        </Link>
        <div className="flex items-center space-x-4">
          <OrganizationSwitcher 
            hidePersonal
            createOrganizationUrl="/create-organization"
            afterCreateOrganizationUrl="/dashboard"
            afterLeaveOrganizationUrl="/select-org"
            afterSelectOrganizationUrl="/dashboard"
          />
          <UserButton 
            afterSignOutUrl="/"
            userProfileMode="navigation"
            userProfileUrl="/user-profile"
          />
        </div>
      </div>
    </header>
  );
}
