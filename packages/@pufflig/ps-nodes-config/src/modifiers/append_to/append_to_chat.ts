import { NodeConfig } from "@pufflig/ps-types";

export const appendToChat: NodeConfig = {
  name: "Append To (Chat)",
  description: "Append a message to a chat",
  tags: ["modifier", "chat"],
  parameters: [],
  outputs: [
    {
      id: "chat",
      name: "Chat",
      description: "The chat with the appended message",
      type: "chat",
      defaultValue: {
        messages: [],
      },
    },
  ],
  inputs: [
    {
      id: "messageId",
      name: "Message ID",
      description:
        "Given a message id, the message is added as a version to the chat message with the same ID. If empty, the message is appended to the chat.",
      type: "text",
      defaultValue: "",
    },
    {
      id: "chat",
      name: "Chat",
      description: "Chat to which append a message",
      type: "chat",
      defaultValue: {
        messages: [],
      },
    },
    {
      id: "message",
      name: "Message",
      description: "Message to append to the chat",
      type: "message",
      defaultValue: null,
    },
  ],
};
