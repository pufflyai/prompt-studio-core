import { NodeConfig } from "../types";

export const templateEditor: NodeConfig = {
  type: "input/template_editor",
  name: "Template Editor",
  category: "input",
  description: "Template Editor",
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
