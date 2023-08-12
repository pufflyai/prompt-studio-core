import { NodeConfig } from "@pufflig/ps-types";

export const customCompletionConfig: NodeConfig = {
  name: "Custom API (Completion)",
  description: "",
  tags: ["adapter", "text"],
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
