import { mutation } from "convex/server";

export default mutation(async ({ db }, { ruleId, newMultiplier }) => {
  await db.table("PricingRules").doc(ruleId).update({ multiplier: newMultiplier });
  return "Rule updated successfully";
});
