"use client";

import { OrganizationList, useOrganization } from "@clerk/nextjs";
import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function SelectOrganizationPage() {
  const { organization } = useOrganization();
  const createTenant = useMutation(api.tenants.createTenant);

  useEffect(() => {
    if (organization) {
      createTenant({
        name: organization.name ?? "",
        clerkOrgId: organization.id,
        settings: { theme: "default", features: [] },
      });
    }
  }, [organization, createTenant]);

  return (
    <OrganizationList 
      hidePersonal
      afterSelectOrganizationUrl={`/${organization?.id}/dashboard`}
      afterCreateOrganizationUrl={`/${organization?.id}/dashboard`}
    />
  );
}
