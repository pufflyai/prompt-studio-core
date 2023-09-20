import { openaiChatConfig } from "./openai/openai_chat";
import { openaiCompletionConfig } from "./openai/openai_completion";
import { openaiEmbeddingConfig, openaiEmbeddingNodeType } from "./openai/openai_embedding";

export const adapterNodes = {
  "adapter/openai_chat": openaiChatConfig,
  "adapter/openai_completion": openaiCompletionConfig,
  [openaiEmbeddingNodeType]: openaiEmbeddingConfig,
};

export const adapterNodeTypes = {
  openaiEmbeddingNodeType,
};
