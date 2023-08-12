import { NodeConfig } from "@pufflig/ps-types";

export const displayChat: NodeConfig = {
  name: "Chat Display",
  description: "",
  tags: ["output", "chat"],
  parameters: [],
  outputs: [],
  inputs: [
    {
      id: "chat",
      name: "Chat",
      description: "",
      type: "chat",
      defaultValue: [],
    },
  ],
};
