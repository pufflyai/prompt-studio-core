import { NodeConfig } from "@pufflig/ps-types";

export const listNodeType = "data/list" as const;

export const list: NodeConfig = {
  name: "List",
  description: "A list of text values.",
  tags: ["data", "list"],
  status: "experimental",
  outputs: [
    {
      id: "list",
      name: "List",
      description: "",
      type: "list",
      defaultValue: [],
    },
  ],
  inputs: [
    {
      id: "list",
      name: "List",
      description: "",
      type: "list",
      defaultValue: [],
    },
  ],
};
