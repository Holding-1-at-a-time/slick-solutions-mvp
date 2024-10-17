import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createOrUpdateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
    tenantId: v.string(),
    role: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existingUser) {
      return await ctx.db.patch(existingUser._id, args);
    } else {
      return await ctx.db.insert("users", args);
    }
  },
});

export const getUser = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
  },
});

export const getUsersByTenant = query({
  args: { tenantId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
<<<<<<< HEAD
      .withIndex("by_tenant", (q) => q.eq("tenantId", args.tenantId))
      .collect();
=======
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
      .first();
    if (user) {
      if (user) {
        const updatedUser = await ctx.db.patch(user._id, updateFields);
        return updatedUser;
      }
      return null;
  },
});

export const deleteUser = mutation({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
    if (user) {
      await ctx.db.delete(user._id);
    }
>>>>>>> 6fca2e06db16e5d1ed44589596cfc4c99769d6ff
  },
});
