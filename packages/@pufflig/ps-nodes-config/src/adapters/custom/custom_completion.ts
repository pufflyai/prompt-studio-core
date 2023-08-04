import { NodeConfig } from "../../types";

export const customCompletionConfig: NodeConfig = {
  type: "adapter/custom_api_completion",
  category: "adapter",
  format: "text",
  name: "Custom API (Completion)",
  description: "",
  parameters: [
    {
      id: "api_definition",
      name: "API Definition",
      type: "api",
      description: "The Definition of your API",
      defaultValue: null,
    },
  ],
  outputs: [
    {
      id: "completion",
      name: "Completion",
      description: "A completion from your API",
      type: "text",
      defaultValue: "",
    },
  ],
  inputs: [
    {
      id: "prompt",
      name: "Prompt",
      description: "The prompt to send to your API",
      type: "text",
      defaultValue: "",
    },
  ],
};
