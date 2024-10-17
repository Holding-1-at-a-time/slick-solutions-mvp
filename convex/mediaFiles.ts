import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const uploadFile = mutation(async ({ db, auth }, file: Buffer, fileName: string, tenantId: string) => {
  const user = auth.userId();
  if (!user) throw new Error("Unauthorized access");

  // Check if the user belongs to the tenant
  const tenant = await db.query("tenants").filter(q => q.eq(q.field("id"), tenantId)).first();
  if (!tenant || !tenant.users.includes(user)) {
    throw new Error("Access denied");
  }

  const fileId = v.bytes(file);
  await db.insert("mediaFiles", {
    fileId,
    fileName,
    tenantId,
    userId: user,
    createdAt: new Date(),
  });
  return fileId;
});
