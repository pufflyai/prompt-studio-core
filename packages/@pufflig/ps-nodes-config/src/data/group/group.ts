import { NodeConfig } from "@pufflig/ps-types";

export const groupNodeType = "data/group" as const;

export const groupNode: NodeConfig = {
  name: "Group",
  description: "Group different values together.",
  tags: ["data", "group"],
  status: "stable",
  customSchema: "input",
  inputs: [],
  outputs: [
    {
      id: "group",
      name: "Group",
      description: "",
      type: "object",
      defaultValue: [],
    },
  ],
};
