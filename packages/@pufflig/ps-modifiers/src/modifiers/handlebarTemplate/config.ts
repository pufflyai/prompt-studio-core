import { ModifierConfig } from "../../types";

export const config: ModifierConfig = {
  id: "modifiers/handlebarTemplate",
  name: "Template",
  description: "Use Handlebars to write prompt templates",
  parameters: {
    variables: {
      type: "string",
      name: "Variables",
      description: "Variables to be used in the template",
      creatable: true,
    },
  },
};
