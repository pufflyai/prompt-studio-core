import { NodeConfig } from "@pufflig/ps-types";

export const outputNodeConfig: NodeConfig = {
  name: "Output",
  description: "Output node",
  tags: ["core", "output"],
  execution: {
    inputs: [
      {
        id: "input",
      },
    ],
    outputs: [],
  },
  parameters: [],
  outputs: [],
  inputs: [],
};
