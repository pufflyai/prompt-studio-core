import { createCompletion } from "./createCompletion";
import { createChatCompletion } from "./createChatCompletion";
import { createEmbedding } from "./createEmbedding";
import { Adapter } from "../../types";

export const openai: Adapter = {
  createCompletion,
  createChatCompletion,
  createEmbedding,
};

export { openaiConfig } from "./config";
