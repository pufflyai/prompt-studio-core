import { NodeConfig } from "@pufflig/ps-types";

export const numberNodeType = "data/number" as const;

export const number: NodeConfig = {
  name: "Number",
  description: "A numerical value.",
  tags: ["data", "number"],
  status: "experimental",
  outputs: [
    {
      id: "number",
      name: "Number",
      description: "",
      type: "number",
      defaultValue: 0,
    },
  ],
  inputs: [
    {
      id: "number",
      name: "Number",
      description: "",
      type: "number",
      defaultValue: 0,
    },
  ],
};
