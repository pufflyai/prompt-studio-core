import { customChatConfig } from "./custom_api/custom_api_chat";
import { customCompletionConfig } from "./custom_api/custom_api_completion";
import { openaiChatConfig } from "./openai/openai_chat";
import { openaiCompletionConfig } from "./openai/openai_completion";
import { openaiEmbeddingConfig, openaiEmbeddingNodeType } from "./openai/openai_embedding";
import { chatModels, completionModels, embeddingModels } from "./openai/openai_models";
import { openAISettings } from "./openai/openai_settings";

export const adapterNodes = {
  "adapter/openai_chat": openaiChatConfig,
  "adapter/openai_completion": openaiCompletionConfig,
  [openaiEmbeddingNodeType]: openaiEmbeddingConfig,
  "adapter/custom_api_chat": customChatConfig,
  "adapter/custom_api_completion": customCompletionConfig,
};

export const adapterSettings = {
  openai: openAISettings,
};

export const modelConfig = {
  openai: {
    chat: chatModels,
    completion: completionModels,
    embedding: embeddingModels,
  },
};

export const adapterNodeTypes = {
  openaiEmbeddingNodeType,
};


