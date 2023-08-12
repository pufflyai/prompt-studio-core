import { NodeConfig } from "@pufflig/ps-types";

export const templateEditor: NodeConfig = {
  name: "Template Editor",
  description: "Template Editor",
  tags: ["input", "text"],
  parameters: [],
  outputs: [
    {
      id: "template",
      name: "Template",
      description: "",
      type: "text",
      defaultValue: "",
    },
  ],
  inputs: [
    {
      id: "template",
      name: "Template",
      description: "",
      type: "text",
      defaultValue: "",
    },
  ],
};
