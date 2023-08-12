import { NodeConfig } from "@pufflig/ps-types";

export const customChatConfig: NodeConfig = {
  name: "Custom API (Chat)",
  description: "",
  tags: ["adapter", "chat"],
  parameters: [
    {
      id: "api_definition",
      name: "API Definition",
      type: "api",
      description: "The Definition of your API",
      defaultValue: null,
    },
  ],
  outputs: [
    {
      id: "message",
      name: "Message",
      description: "A message from your API",
      type: "message",
      defaultValue: null,
    },
  ],
  inputs: [
    {
      id: "chat",
      name: "Chat",
      description: "The chat to send to your API",
      type: "chat",
      defaultValue: [],
    },
  ],
};