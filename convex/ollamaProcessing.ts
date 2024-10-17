import { mutation } from "./_generated/server";
import { OllamaClient } from "@ollama/ollama-sdk";

const ollamaClient = new OllamaClient({ apiKey: process.env.OLLAMA_API_KEY });

export const processMediaWithOllama = mutation({
  args: {
    fileId: v.string(), // ID of the file stored in your system
  },
  handler: async (ctx, { fileId }) => {
    const fileBuffer = await ctx.db.get(fileId); // Fetch the file from your storage
    if (!fileBuffer) {
      throw new Error("File not found");
    }

    const results = await ollamaClient.analyze({
      model: "ManishThota/llava_next_video",
      input: fileBuffer,
    });

    // Optionally, store the results back in the database
    await ctx.db.insert("analysisResults", {
      fileId,
      results,
      analyzedAt: new Date(),
    });

    return results;
  },
});

export const analyzeVehicleDamage = mutation({
  args: {
    imageId: v.id("mediaFiles"), // Assuming mediaFiles is the table where images are stored
  },
  handler: async (ctx, { imageId }) => {
    const image = await ctx.db.get(imageId);
    if (!image) {
      throw new Error("Image not found");
    }

    return await ollamaClient.analyze({
          model: "llava",
          input: image.fileBuffer, // Assuming fileBuffer is where the image data is stored
        });

  },
});

// Extend the existing analyzeVehicleDamage function with error handling
export const analyzeVehicleDamageWithHandling = mutation({
  args: {
    imageId: v.id("mediaFiles"),
  },
  handler: async (ctx, { imageId }) => {
    try {
      const image = await ctx.db.get(imageId);
      if (!image) {
        throw new Error("Image not found");
      }

      const results = await ollamaClient.analyze({
        model: "llava",
        input: image.fileBuffer,
      });

      return results;
    } catch (error) {
      console.error("Error processing image with Ollama:", error);
      // Implement fallback logic if necessary
      throw new Error("Failed to process image");
    }
  },
});

// Add logging to the existing analyzeVehicleDamageWithHandling function
export const analyzeVehicleDamageWithLogging = mutation({
  args: {
    imageId: v.id("mediaFiles"),
  },
  handler: async (ctx, { imageId }) => {
    try {
      const image = await ctx.db.get(imageId);
      if (!image) {
        console.log("Image not found:", imageId);
        throw new Error("Image not found");
      }

      const results = await ollamaClient.analyze({
        model: "llava",
        input: image.fileBuffer,
      });

      console.log("Analysis results:", results);
      return results;
    } catch (error) {
      console.error("Error processing image with Ollama:", error);
      throw new Error("Failed to process image");
    }
  },
});
