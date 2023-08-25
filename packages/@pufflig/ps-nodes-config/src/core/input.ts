import { NodeConfig } from "@pufflig/ps-types";

export const inputNodeConfig: NodeConfig = {
  name: "Input",
  description: "Input node",
  tags: ["core", "input"],
  execution: {
    inputs: [],
    outputs: [
      {
        id: "output",
      },
    ],
  },
  parameters: [],
  outputs: [],
  inputs: [],
};
