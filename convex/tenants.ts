import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createTenant = mutation({
  args: { 
    name: v.string(), 
    clerkOrgId: v.string(), 
    settings: v.object({ 
      theme: v.string(), 
      features: v.array(v.string()) 
    }) 
  },
  handler: async (ctx, args) => {
    const existingTenant = await ctx.db
      .query("tenants")
      .withIndex("by_clerk_org_id", (q) => q.eq("clerkOrgId", args.clerkOrgId))
      .first();

    if (existingTenant) {
      return await ctx.db.patch(existingTenant._id, args);
    } else {
      return await ctx.db.insert("tenants", args);
    }
  },
});

export const getTenantByClerkOrgId = query({
  args: { clerkOrgId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tenants")
      .withIndex("by_clerk_org_id", (q) => q.eq("clerkOrgId", args.clerkOrgId))
      .first();
  },
});

export const updateTenant = mutation({
  args: { 
    id: v.id("tenants"), 
    name: v.string(), 
    settings: v.object({ 
      theme: v.string(), 
      features: v.array(v.string()) 
    }) 
  },
  handler: async (ctx, args) => {
    const { id, ...updateFields } = args;
    await ctx.db.patch(id, updateFields);
  },
});
