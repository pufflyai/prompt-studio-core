import { NodeConfig } from "@pufflig/ps-types";

export const objectNodeType = "data/object" as const;

export const objectNode: NodeConfig = {
  name: "Object",
  description: "Map various input into an object",
  tags: ["data", "text"],
  parameters: [],
  customSchema: "input",
  inputs: [],
  outputs: [
    {
      id: "object",
      name: "Object",
      description: "",
      type: "object",
      defaultValue: [],
    },
  ],
};
