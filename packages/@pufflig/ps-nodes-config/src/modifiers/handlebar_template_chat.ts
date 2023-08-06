import { Chat, ObjectDefinition } from "@pufflig/ps-types";
import { NodeConfig } from "../types";

export interface HandlebarTemplateChatInput {
  chat: Chat;
  variables: ObjectDefinition;
}

export interface HandlebarTemplateChatOutput {
  chat: Chat;
}

export const handlebarTemplateChat: NodeConfig = {
  type: "modifier/handlebar_template_chat",
  name: "Handlebar Template (Chat)",
  category: "modifier",
  format: "chat",
  description: "",
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
