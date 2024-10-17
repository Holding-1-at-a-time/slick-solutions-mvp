import { CreateOrganization } from "@clerk/nextjs";

export default function CreateOrganizationPage() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Create a New Organization</h1>
      <CreateOrganization afterCreateOrganizationUrl="/dashboard" />
    </div>
  );
}
