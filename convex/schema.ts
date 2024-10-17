// NOTE: You can remove this file. Declaring the shape
// of the database is entirely optional in Convex.
// See https://docs.convex.dev/database/schemas.

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema(
  {
    users: defineTable({
      name: v.string(),
      email: v.string(),
      clerkId: v.string(),
      username: v.optional(v.string()),
      firstName: v.optional(v.string()),
      lastName: v.optional(v.string()),
      createdAt: v.string(),
      updatedAt: v.string(),
      phoneNumber: v.optional(v.string()),
      emailVerified: v.boolean(),
      hasVerifiedContactInfo: v.boolean(),
      metadata: v.optional(v.string()),
      organizationId: v.optional(v.string()),
    }).index("by_clerk_id", ["clerkId"]),

    organizations: defineTable({
      name: v.string(),
      logo: v.optional(v.string()),
      slug: v.string(),
      tenantId: v.string(),
    }).index("by_tenant_id", ["tenantId"]),

    organizationMemberships: defineTable({
      userId: v.id("users"),
      organizationId: v.id("organizations"),
      role: v.string(),
      permissions: v.array(v.string()),
    }).index("by_user_and_org", ["userId", "organizationId"]),

    assessments: defineTable({
      userId: v.id("users"),
      organizationId: v.id("organizations"),
      vehicleType: v.string(),
      damageDescription: v.string(),
      images: v.array(v.string()),
      status: v.string(),
    }),

    estimates: defineTable({
      assessmentId: v.id("assessments"),
      totalPrice: v.number(),
      lineItems: v.array(v.object({
        description: v.string(),
        price: v.number(),
      })),
      status: v.string(),
    }),
  },
  // If you ever get an error about schema mismatch
  // between your data and your schema, and you cannot
  // change the schema to match the current data in your database,
  // you can:
  //  1. Use the dashboard to delete tables or individual documents
  //     that are causing the error.
  //  2. Change this option to `false` and make changes to the data
  //     freely, ignoring the schema. Don't forget to change back to `true`!
  { schemaValidation: true }
);
