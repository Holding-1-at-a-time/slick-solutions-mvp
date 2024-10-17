import { OrganizationProfile } from "@clerk/nextjs";

export default function OrganizationProfilePage() {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Organization Profile</h1>
      <OrganizationProfile />
    </div>
  );
}
