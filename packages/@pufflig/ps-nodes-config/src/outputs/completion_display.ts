import { NodeConfig } from "../types";

export const completionDisplay: NodeConfig = {
  type: "output/completion_display",
  name: "Completion Display",
  category: "output",
  format: "text",
  description: "",
  parameters: [],
  outputs: [],
  inputs: [
    {
      id: "prompt",
      name: "Prompt",
      description: "The prompt used for this completion",
      type: "text",
    },
    {
      id: "completion",
      name: "Completion",
      description: "The completion generated from the prompt",
      type: "text",
    },
  ],
};
