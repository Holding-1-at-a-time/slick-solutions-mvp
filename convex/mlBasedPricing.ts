import { mutation } from "./_generated/server";

export const applyMLModel = mutation(async (ctx, { vehicleType, location, severity, tenantId }) => {
  const basePrice = await ctx.actions.calculateBasePrice({ vehicleType, location, severity, tenantId });

  // Real ML model integration
  try {
    const mlAdjustment = await ctx.externalServices.mlService.getPricingAdjustment({ vehicleType, location, severity });
    const priceAfterML = basePrice * (1 + mlAdjustment);
    return priceAfterML;
  } catch (error) {
    console.error("ML model integration failed:", error);
    throw new Error("Failed to integrate with ML model for pricing adjustments.");
  }
});
