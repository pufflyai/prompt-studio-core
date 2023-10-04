import { NodeConfig } from "@pufflig/ps-types";

export const templateTextNodeTypeV2 = "modifier/template_text_v2" as const;

export const templateTextV2: NodeConfig = {
  name: "Text Template",
  description: "Write text with variables",
  tags: ["modifier", "text"],
  status: "stable",
  customSchema: "input",
  outputs: [
    {
      id: "text",
      name: "Text",
      description: "Text with variables filled in",
      type: "text",
      defaultValue: "",
    },
  ],
  inputs: [
    {
      id: "template",
      name: "Template",
      description: "Template to fill in",
      type: "text",
      defaultValue: "",
    },
  ],
};
