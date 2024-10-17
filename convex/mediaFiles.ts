import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { addToQueue } from "./queue";

export const uploadFile = mutation({
  args: {
    file: v.bytes(),
    fileName: v.string(),
  },
  handler: async (ctx, { file, fileName }) => {
    const fileId = await ctx.db.insert("mediaFiles", {
      file,
      fileName,
      uploadedAt: new Date(),
    });

    // Add to processing queue
    addToQueue(fileId);

    return fileId;
  },
});
