import { NodeConfig } from "@pufflig/ps-types";

export const templateTextNodeType = "modifier/template_text" as const;

export const templateText: NodeConfig = {
  name: "Text Template",
  description: "Using this template, you can insert variables into text.",
  tags: ["modifier", "text"],
  status: "deprecated",
  outputs: [
    {
      id: "text",
      name: "Text",
      description: "The text from the handlebar template filled in",
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
    {
      id: "variables",
      name: "Variables",
      description: "Chat variables to use on the template",
      type: "object",
      defaultValue: [],
    },
  ],
};
