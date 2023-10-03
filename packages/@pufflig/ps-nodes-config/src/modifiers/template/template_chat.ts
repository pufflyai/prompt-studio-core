import { NodeConfig } from "@pufflig/ps-types";

export const templateChatNodeType = "modifier/template_chat" as const;

export const templateChat: NodeConfig = {
  name: "Chat Template",
  description: "Using this template, you can insert text into a chat.",
  tags: ["modifier", "chat", "template"],
  status: "experimental",
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
