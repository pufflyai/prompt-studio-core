import { NodeConfig } from "@pufflig/ps-types";

export const addMessageNodeType = "modifier/add_message" as const;

export const addMessage: NodeConfig = {
  name: "Add Message",
  description: "Add a message to a chat",
  tags: ["modifier", "chat", "message"],
  status: "experimental",
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
