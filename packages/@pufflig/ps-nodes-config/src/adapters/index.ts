import { customChatConfig } from "./custom_api/custom_api_chat";
import { customCompletionConfig } from "./custom_api/custom_api_completion";
import { openaiChatConfig } from "./openai/openai_chat";
import { openaiCompletionConfig } from "./openai/openai_completion";
import { chatModels, completionModels, embeddingModels } from "./openai/openai_models";
import { openAISettings } from "./openai/openai_settings";

export const adapterNodes = {
  "adapter/openai_chat": openaiChatConfig,
  "adapter/custom_api_chat": customChatConfig,
  "adapter/openai_completion": openaiCompletionConfig,
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
