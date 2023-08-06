import { Chat, ChatMessage, ModelConfig } from "@pufflig/ps-types";
import { NodeConfig } from "../../types";
import { chatModels } from "./openai_models";

export interface OpenAIChatInput {
  api_key: string;
  chat: Chat;
  model: ModelConfig;
}

export interface OpenAIChatOutput {
  message: ChatMessage;
}

export const openaiChatConfig: NodeConfig = {
  type: "adapter/openai_chat",
  category: "adapter",
  format: "chat",
  name: "OpenAI (Chat)",
  description: "OpenAI Chat",
  parameters: [
    {
      id: "api_key",
      name: "API Key",
      type: "secret",
      description: "The API key for OpenAI",
      defaultValue: "${{SECRET:open_ai/api_key}}",
    },
  ],
  outputs: [
    {
      id: "message",
      name: "Message",
      description: "A message from OpenAI",
      type: "message",
      defaultValue: null,
    },
  ],
  inputs: [
    {
      id: "chat",
      name: "Chat",
      description: "The chat to send to OpenAI",
      type: "chat",
      defaultValue: [],
    },
    {
      id: "model",
      name: "Model",
      description: "The model to use",
      type: "model",
      definition: chatModels,
      defaultValue: {
        modelId: "gpt-3.5-turbo",
        parameters: {},
      },
    },
  ],
};
