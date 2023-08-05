import { NodeConfig } from "../types";

export const handlebarTemplateCompletion: NodeConfig = {
  type: "modifier/handlebar_template_completion",
  name: "Handlebar Template (Completion)",
  category: "modifier",
  format: "text",
  description: "",
  parameters: [],
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
