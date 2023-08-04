import { NodeConfig } from "../../types";
import { completionModels } from "./openai_models";

export const openaiCompletionConfig: NodeConfig = {
  type: "adapter/openai_completion",
  category: "adapter",
  format: "text",
  name: "OpenAI (Completion)",
  description: "OpenAI Completion",
  parameters: [
    {
      id: "api_key",
      name: "API Key",
      type: "secret",
      description: "The API key for OpenAI",
      value: "${{SECRET:openai/api_key}}",
    },
  ],
  outputs: [
    {
      id: "completion",
      name: "Completion",
      description: "The completion from OpenAI",
      type: "text",
    },
  ],
  inputs: [
    {
      id: "prompt",
      name: "Prompt",
      description: "The prompt to send to OpenAI",
      type: "text",
    },
    {
      id: "model",
      name: "Model",
      description: "The model to use",
      type: "model",
      definition: completionModels,
    },
  ],
};
