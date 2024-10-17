import { mutation } from "./_generated/server";

// A/B Test Pricing Adjustment
export const applyABTestPricing = mutation(async (ctx, { userId, basePrice }) => {
  // Determine if the user is part of the test group
  const user = await ctx.db.table('Users').filter(q => q.eq(q.field('_id'), userId)).first();
  const isTestGroup = user && user.testGroup === 'B';

  // Apply different pricing logic based on the test group
  const adjustmentFactor = isTestGroup ? 1.1 : 1.0; // 10% increase for test group B
  return basePrice * adjustmentFactor;
});
