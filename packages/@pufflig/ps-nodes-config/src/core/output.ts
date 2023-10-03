import { NodeConfig } from "@pufflig/ps-types";

export const outputNodeType = "core/output" as const;

export const outputNodeConfig: NodeConfig = {
  name: "End",
  description: "Pass the values you want to send to your app here.",
  tags: ["core", "output"],
  status: "stable",
  execution: {
    inputs: [],
    outputs: [],
  },
  customSchema: "input",
  outputs: [],
  inputs: [],
};
