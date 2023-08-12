import { NodeConfig } from "@pufflig/ps-types";

export const completionDisplay: NodeConfig = {
  name: "Completion Display",
  description: "",
  tags: ["output", "text"],
  parameters: [],
  outputs: [],
  inputs: [
    {
      id: "prompt",
      name: "Prompt",
      description: "The prompt used for this completion",
      type: "text",
      defaultValue: "",
    },
    {
      id: "completion",
      name: "Completion",
      description: "The completion generated from the prompt",
      type: "text",
      defaultValue: "",
    },
  ],
};
