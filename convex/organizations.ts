import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createOrUpdateOrganization = mutation({
  args: {
    tenantId: v.string(),
    name: v.string(),
    logo: v.optional(v.string()),
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const existingOrg = await ctx.db
      .query("organizations")
      .withIndex("by_tenant_id", (q) => q.eq("tenantId", args.tenantId))
      .first();

    if (existingOrg) {
      return await ctx.db.patch(existingOrg._id, args);
    } else {
      return await ctx.db.insert("organizations", args);
    }
  },
});

export const getOrganization = query({
  args: { tenantId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("organizations")
      .withIndex("by_tenant_id", (q) => q.eq("tenantId", args.tenantId))
      .first();
  },
});

export const addUserToOrganization = mutation({
  args: {
    clerkId: v.string(),
    tenantId: v.string(),
    role: v.string(),
    permissions: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    const org = await ctx.db
      .query("organizations")
      .withIndex("by_tenant_id", (q) => q.eq("tenantId", args.tenantId))
      .first();

    if (user && org) {
      await ctx.db.insert("organizationMemberships", {
        userId: user._id,
        organizationId: org._id,
        role: args.role,
        permissions: args.permissions,
      });
    }
  },
});
