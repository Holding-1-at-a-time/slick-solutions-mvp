import { mutation } from "./_generated/server";

export const applyRuleBasedAdjustments = mutation(async (ctx, { price, rules }) => {
  let adjustedPrice = price;

  // Apply rules iteratively
  for (const rule of rules) {
    adjustedPrice *= rule.multiplier;
  }

  return adjustedPrice;
});
