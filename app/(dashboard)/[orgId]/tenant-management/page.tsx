"use client";

import { useOrganization } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function TenantManagement() {
  const { organization } = useOrganization();
  const tenant = useQuery(api.tenants.getTenantByClerkOrgId, { clerkOrgId: organization?.id ?? "" });
  const updateTenant = useMutation(api.tenants.updateTenant);

  if (!tenant) return <div>Loading...</div>;

  return (
    <div>
      <h1>Tenant Management</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        updateTenant({
          id: tenant._id,
          name: formData.get("name") as string,
          settings: {
            theme: formData.get("theme") as string,
            features: (formData.get("features") as string).split(","),
          },
        });
      }}>
        <input name="name" defaultValue={tenant.name} />
        <input name="theme" defaultValue={tenant.settings.theme} />
        <input name="features" defaultValue={tenant.settings.features.join(",")} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
