import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Navigation } from "@/components/Navigation";

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
      <main>{children}</main>
    </div>
  );
}
