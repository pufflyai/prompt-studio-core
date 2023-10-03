import { NodeConfig } from "@pufflig/ps-types";

export const messageNodeType = "data/message" as const;

export const message: NodeConfig = {
  name: "Message",
  description: "Can be used to create a message that can be added to a chat.",
  tags: ["data", "message"],
  status: "stable",
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
      id: "content",
      name: "Content",
      description: "The content of the message.",
      type: "text",
      defaultValue: "",
    },
    {
      id: "role",
      name: "Role",
      description: "The role of the author of the message.",
      type: "selection",
      defaultValue: "user",
      options: [
        {
          id: "user",
          name: "User",
        },
        {
          id: "assistant",
          name: "Assistant",
        },
        {
          id: "system",
          name: "System",
        },
        {
          id: "function",
          name: "Function",
        },
      ],
    },
  ],
};
