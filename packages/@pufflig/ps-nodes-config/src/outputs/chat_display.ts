import { NodeConfig } from "@pufflig/ps-types";

export const chatDisplay: NodeConfig = {
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
