import { NodeConfig } from "@pufflig/ps-types";

export const messageNodeType = "data/message" as const;

export const message: NodeConfig = {
  name: "Message",
  description: "",
  tags: ["data", "message"],
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
