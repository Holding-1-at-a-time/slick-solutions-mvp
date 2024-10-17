import { mutation } from "./_generated/server";

export const parseOllamaResults = mutation({
  args: {
    analysisResults: v.any(), // Type should be adjusted based on Ollama's output structure
  },
  handler: async (ctx, { analysisResults }) => {
    // Example parsing logic
    return analysisResults.predictions.map(prediction => ({
          part: prediction.label,
          damageSeverity: prediction.score,
        }));

  },
});
