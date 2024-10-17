import { query } from "convex/server";

export default query(async ({ db }) => {
  return await db.table("PricingRules").collect();
});
