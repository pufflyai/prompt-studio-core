import { NodeConfig } from "../../types";

export const customChatConfig: NodeConfig = {
  type: "adapter/custom_api_chat",
  category: "adapter",
  format: "chat",
  name: "Custom API (Chat)",
  description: "",
  parameters: [
    {
      id: "api_definition",
      name: "API Definition",
      type: "api",
      description: "The Definition of your API",
    },
  ],
  outputs: [
    {
      id: "message",
      name: "Message",
      description: "A message from your API",
      type: "message",
    },
  ],
  inputs: [
    {
      id: "chat",
      name: "Chat",
      description: "The chat to send to your API",
      type: "chat",
    },
  ],
};
