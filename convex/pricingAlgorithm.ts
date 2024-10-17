import { mutation } from "./_generated/server";

export const calculateBasePrice = mutation(async (ctx, { vehicleType, location, severity, tenantId }) => {
  // Ensure tenant-specific pricing
  const basePricing = await ctx.db.query('BasePricing')
    .filter(q => q.and(q.eq(q.field('vehicleType'), vehicleType), q.eq(q.field('tenantId'), tenantId)))
    .first();

  if (!basePricing) {
    throw new Error(`Base pricing not found for vehicle type: ${vehicleType} and tenant ID: ${tenantId}`);
  }

  // Fetch multipliers in a single query to optimize performance
  const [locationMultiplier, severityMultiplier] = await Promise.all([
    ctx.db.query('LocationMultipliers').filter(q => q.eq(q.field('location'), location)).first(),
    ctx.db.query('SeverityMultipliers').filter(q => q.eq(q.field('severity'), severity)).first()
  ]);

  if (!locationMultiplier || !severityMultiplier) {
    throw new Error("Required multipliers are missing.");
  }

  const price = basePricing.price * locationMultiplier.multiplier * severityMultiplier.multiplier;
  return price;
});
