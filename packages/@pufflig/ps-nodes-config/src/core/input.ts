import { NodeConfig } from "@pufflig/ps-types";

export const inputNodeType = "core/input" as const;

export const inputNodeConfig: NodeConfig = {
  name: "Start",
  description: "First node in a workflow",
  tags: ["core", "input"],
  execution: {
    inputs: [],
    outputs: [
      {
        id: "output",
      },
    ],
  },
  customSchema: "output",
  parameters: [],
  outputs: [],
  inputs: [],
};
