import { NodeConfig } from "@pufflig/ps-types";

export const promptNodeType = "data/prompt" as const;

export const prompt: NodeConfig = {
  name: "Template",
  description: "A text template with variables.",
  tags: ["data", "text", "prompt"],
  status: "stable",
  outputs: [
    {
      id: "prompt",
      name: "Template",
      description: "Template with variables filled in",
      type: "text",
      defaultValue: "",
    },
  ],
  inputs: [
    {
      id: "template",
      name: "Template",
      description: "Template with variables",
      type: "text",
      defaultValue: "",
    },
  ],
};
