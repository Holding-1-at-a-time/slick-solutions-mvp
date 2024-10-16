import { OrganizationList } from "@clerk/nextjs";

export default function SelectOrganizationPage() {
  return (
    <OrganizationList 
      hidePersonal
      afterSelectOrganizationUrl={`/${org.id}/dashboard`}
      afterCreateOrganizationUrl="/dashboard"
    />
  );
}
