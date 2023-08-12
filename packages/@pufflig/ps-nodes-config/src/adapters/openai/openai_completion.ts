import { ModelConfig, NodeConfig } from "@pufflig/ps-types";
import { completionModels } from "./openai_models";

export interface OpenAICompletionInput {
  api_key: string;
  prompt: string;
  model: ModelConfig;
}

export interface OpenAICompletionOutput {
  completion: string;
}

export const openaiCompletionConfig: NodeConfig = {
  name: "OpenAI (Completion)",
  description: "OpenAI Completion",
  tags: ["adapter", "text"],
  parameters: [
    {
      id: "api_key",
      name: "API Key",
      type: "secret",
      description: "The API key for OpenAI",
      defaultValue: "${{SECRET:openai/api_key}}",
    },
  ],
  outputs: [
    {
      id: "completion",
      name: "Completion",
      description: "The completion from OpenAI",
      type: "text",
      defaultValue: "",
    },
  ],
  inputs: [
    {
      id: "prompt",
      name: "Prompt",
      description: "The prompt to send to OpenAI",
      type: "text",
      defaultValue: "",
    },
    {
      id: "model",
      name: "Model",
      description: "The model to use",
      type: "model",
      definition: completionModels,
      defaultValue: {
        modelId: "text-davinci-003",
        parameters: {},
      },
    },
  ],
};
