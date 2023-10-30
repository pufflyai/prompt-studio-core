import { NodeConfig } from "@pufflig/ps-types";

export const promptNodeType = "data/prompt" as const;

export const prompt: NodeConfig = {
  name: "Prompt",
  description: "A prompt with variables.",
  tags: ["data", "text", "prompt"],
  status: "stable",
  outputs: [
    {
      id: "prompt",
      name: "Prompt",
      description: "Prompt with variables filled in",
      type: "text",
      defaultValue: "",
    },
  ],
  inputs: [
    {
      id: "template",
      name: "Template",
      description: "Prompt Template to fill in",
      type: "text",
      defaultValue: "",
    },
  ],
};
