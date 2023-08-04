import { NodeConfig } from "../types";

export const handlebarTemplateChat: NodeConfig = {
  type: "modifier/handlebar_template_chat",
  name: "Handlebar Template (Chat)",
  category: "modifier",
  format: "chat",
  description: "",
  parameters: [],
  custom_inputs: true,
  custom_input_schema: {
    type: "text",
  },
  outputs: [
    {
      id: "chat",
      name: "Chat",
      description: "The chat with variables filled in",
      type: "chat",
      defaultValue: [],
    },
  ],
  inputs: [
    {
      id: "chat",
      name: "Chat",
      description: "Chat template to fill in",
      type: "chat",
      defaultValue: [],
    },
  ],
};
