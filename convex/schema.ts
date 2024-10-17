// NOTE: You can remove this file. Declaring the shape
// of the database is entirely optional in Convex.
// See https://docs.convex.dev/database/schemas.

import { defineSchema, defineTable, s } from "convex/schema";

export default defineSchema(
  {
    users: defineTable({
      name: v.string(),
      email: v.string(),
      clerkId: v.string(),
<<<<<<< HEAD
      tenantId: v.string(),
      role: v.string(),
    }).index("by_clerk_id", ["clerkId"])
      .index("by_tenant", ["tenantId"]),

    tenants: defineTable({
      name: v.string(),
      clerkOrgId: v.string(),
      settings: v.object({
        theme: v.string(),
        features: v.array(v.string()),
      }),
    }).index("by_clerk_org_id", ["clerkOrgId"]),
=======
      username: v.optional(v.string()),
      firstName: v.optional(v.string()),
      lastName: v.optional(v.string()),
      createdAt: v.string(),
      updatedAt: v.string(),
      phoneNumber: v.optional(v.string()),
      emailVerified: v.boolean(),
      hasVerifiedContactInfo: v.boolean(),
      metadata: v.optional(v.object()),
      organizationId: v.optional(v.string()),
    }).index("by_clerk_id", ["clerkId"]),
>>>>>>> 6fca2e06db16e5d1ed44589596cfc4c99769d6ff

    organizations: defineTable({
      name: v.string(),
      tenantId: v.string(),
      logo: v.optional(v.string()),
      slug: v.string(),
    }).index("by_tenant_id", ["tenantId"]),

    organizationMemberships: defineTable({
      userId: v.id("users"),
      organizationId: v.id("organizations"),
      role: v.string(),
      permissions: v.array(v.string()),
    }).index("by_user_and_org", ["userId", "organizationId"]),

    assessments: defineTable({
      userId: s.id("users"),
      tenantId: s.id("tenants"),
      vehicleInfo: s.struct({
        make: s.string(),
        model: s.string(),
        year: s.number(),
        vin: s.string(),
      }),
      exteriorCondition: s.struct({
        bodyCondition: s.string(),
        paintCondition: s.string(),
        wheelCondition: s.string(),
      }),
      interiorCondition: s.struct({
        seatCondition: s.string(),
        dashboardCondition: s.string(),
        carpetCondition: s.string(),
      }),
      additionalDetails: s.struct({
        notes: s.optional(s.string()),
        requestedServices: s.array(s.string()),
      }),
      status: s.string(),
      createdAt: s.number(),
      updatedAt: s.number(),
      version: s.number(),
    }).index("by_user", ["userId"])
      .index("by_tenant", ["tenantId"]),
  },
  // If you ever get an error about schema mismatch
  // between your data and your schema, and you cannot
  // change the schema to match the current data in your database,
  // you can:
  //   1. Use the dashboard to delete tables or individual documents
  //      that are causing the error.
  //   2. Change this option to `false` and make changes to the data
  //      freely, ignoring the schema. Don't forget to change back to `true`!
  { schemaValidation: true }
);
