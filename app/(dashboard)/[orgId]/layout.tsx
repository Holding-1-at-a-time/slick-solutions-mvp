import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Navigation } from "@/components/Navigation";
import { ConvexProviderWithClerk } from "convex/react-clerk";

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { orgId: string };
}) {
  return (
    <div>
      <header>
        <OrganizationSwitcher 
          hidePersonal
          afterCreateOrganizationUrl={`/${params.orgId}/dashboard`}
          afterLeaveOrganizationUrl="/select-org"
          afterSelectOrganizationUrl={`/${params.orgId}/dashboard`}
        />
        <UserButton afterSignOutUrl="/" />
      </header>
      <Navigation />
      <main>
       <ConvexClientProvider> {children} </ConvexProviderWithClerk>
        </main>
    </div>
  );
}
