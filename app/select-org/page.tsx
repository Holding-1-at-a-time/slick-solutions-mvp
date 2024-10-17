import { OrganizationList } from '@clerk/nextjs';

export default function SelectOrganizationPage() {
  return (
    <OrganizationList 
      hidePersonal
      afterSelectOrganizationUrl="/dashboard"
      afterCreateOrganizationUrl="/dashboard"
    />
  );
}
