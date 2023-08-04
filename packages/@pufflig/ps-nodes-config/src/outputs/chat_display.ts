import { NodeConfig } from "../types";

export const chatDisplay: NodeConfig = {
  type: "output/chat_display",
  name: "Chat Display",
  category: "output",
  format: "chat",
  description: "",
  parameters: [],
  outputs: [],
  inputs: [
    {
      id: "chat",
      name: "Chat",
      description: "",
      type: "chat",
    },
  ],
};
