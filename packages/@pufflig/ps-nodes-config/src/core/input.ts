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
        id: "exec:output",
      },
    ],
  },
  customSchema: "output",
  outputs: [],
  inputs: [],
};
