import { NodeConfig } from "@pufflig/ps-types";

export const handlebarTemplateChat: NodeConfig = {
  name: "Handlebar Template (Chat)",
  description: "",
  tags: ["modifier", "chat"],
  outputs: [
    {
      id: "chat",
      name: "Chat",
      description: "The chat with variables filled in",
      type: "chat",
      defaultValue: {
        messages: [],
      },
    },
  ],
  inputs: [
    {
      id: "chat",
      name: "Chat",
      description: "Chat template to fill in",
      type: "chat",
      defaultValue: {
        messages: [],
      },
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
