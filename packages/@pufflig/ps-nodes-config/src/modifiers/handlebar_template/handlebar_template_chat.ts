import { NodeConfig } from "@pufflig/ps-types";

export const handlebarTemplateChat: NodeConfig = {
  name: "Handlebar Template (Chat)",
  description: "",
  tags: ["modifier", "chat"],
  parameters: [],
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
    {
      id: "variables",
      name: "Variables",
      description: "Chat variables to use on the template",
      type: "object",
      defaultValue: [],
    },
  ],
};
