import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createAssessment = mutation({
  args: {
    userId: v.id("users"),
    tenantId: v.id("tenants"),
    vehicleInfo: v.object({
      make: v.string(),
      model: v.string(),
      year: v.number(),
      vin: v.string(),
    }),
    exteriorCondition: v.object({
      bodyCondition: v.string(),
      paintCondition: v.string(),
      wheelCondition: v.string(),
    }),
    interiorCondition: v.object({
      seatCondition: v.string(),
      dashboardCondition: v.string(),
      carpetCondition: v.string(),
    }),
    additionalDetails: v.object({
      notes: v.optional(v.string()),
      requestedServices: v.array(v.string()),
    }),
    status: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
    version: v.number(),
  },
  handler: async (ctx, args) => {
    args.version = 1; // Initial version
    const assessmentId = await ctx.db.insert("assessments", args);
    return assessmentId;
  },
});

export const updateAssessment = mutation({
  args: {
    id: v.id("assessments"),
    updates: v.object({
      userId: v.id("users"),
      tenantId: v.id("tenants"),
      vehicleInfo: v.object({
        make: v.string(),
        model: v.string(),
        year: v.number(),
        vin: v.string(),
      }),
      exteriorCondition: v.object({
        bodyCondition: v.string(),
        paintCondition: v.string(),
        wheelCondition: v.string(),
      }),
      interiorCondition: v.object({
        seatCondition: v.string(),
        dashboardCondition: v.string(),
        carpetCondition: v.string(),
      }),
      additionalDetails: v.object({
        notes: v.optional(v.string()),
        requestedServices: v.array(v.string()),
      }),
      status: v.string(),
      createdAt: v.number(),
      updatedAt: v.number(),
      version: v.number(),
    }),
  },
  handler: async (ctx, { id, updates }) => {
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Assessment not found");
    updates.version = existing.version + 1; // Increment version
    await ctx.db.update(id, updates);
    return id;
  },
});

// Query to get a specific assessment with caching
export const getAssessment = query({
  args: { id: v.id("assessments") },
  handler: async (ctx, args) => {
    const cacheKey = `assessment_${args.id}`;
    let assessment = await ctx.cache.get(cacheKey);
    if (!assessment) {
      assessment = await ctx.db.get(args.id);
      await ctx.cache.set(cacheKey, assessment, { ttl: 3600 }); // Cache for 1 hour
    }
    return assessment;
  },
});

// Query to get assessments by tenant with caching
export const getAssessmentsByTenant = query({
  args: { tenantId: v.string() },
  handler: async (ctx, args) => {
    const cacheKey = `assessments_${args.tenantId}`;
    let assessments = await ctx.cache.get(cacheKey);
    if (!assessments) {
      assessments = await ctx.db
        .query("assessments")
        .filter(q => q.eq("tenantId", args.tenantId))
        .collect();
      await ctx.cache.set(cacheKey, assessments, { ttl: 3600 }); // Cache for 1 hour
    }
    return assessments;
  },
});
