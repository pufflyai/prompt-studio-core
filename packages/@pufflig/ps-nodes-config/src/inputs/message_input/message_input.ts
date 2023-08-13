import { NodeConfig } from "@pufflig/ps-types";

export const MessageInput: NodeConfig = {
  name: "Message Input",
  description: "",
  tags: ["input", "chat"],
  parameters: [],
  outputs: [
    {
      id: "message",
      name: "Message",
      description: "",
      type: "message",
      defaultValue: null,
    },
  ],
  inputs: [
    {
      id: "message",
      name: "Message",
      description: "",
      type: "message",
      defaultValue: null,
    },
  ],
};
