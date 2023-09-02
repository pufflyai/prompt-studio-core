import { NodeConfig } from "@pufflig/ps-types";

export const outputNodeType = "core/output" as const;

export const outputNodeConfig: NodeConfig = {
  name: "End",
  description: "Final node in a workflow",
  tags: ["core", "output"],
  execution: {
    inputs: [
      {
        id: "input",
      },
    ],
    outputs: [],
  },
  customSchema: "input",
  parameters: [],
  outputs: [],
  inputs: [],
};
