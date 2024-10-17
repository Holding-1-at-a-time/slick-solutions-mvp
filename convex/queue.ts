import { processMediaWithOllama } from "./ollamaProcessing";

const queue = [];

export const addToQueue = (fileId) => {
  queue.push(fileId);
  processQueue();
};

const processQueue = async () => {
  while (queue.length > 0) {
    const fileId = queue.shift();
    try {
      await processMediaWithOllama(fileId);
      console.log(`Processed file: ${fileId}`);
    } catch (error) {
      console.error(`Failed to process file ${fileId}: ${error}`);
      // Optionally, requeue the file or handle the error
    }
  }
};
