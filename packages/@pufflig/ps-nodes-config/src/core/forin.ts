import { NodeConfig } from "@pufflig/ps-types";

export const forinNodeType = "core/forin" as const;

export const forinNodeConfig: NodeConfig = {
  name: "Loop",
  description: "Loop over items in a list",
  tags: ["core", "forin"],
  execution: {
    inputs: [
      {
        id: "input",
      },
    ],
    outputs: [
      {
        id: "output",
        name: "Step",
      },
      {
        id: "complete",
        name: "Complete",
      },
    ],
  },
  parameters: [],
  outputs: [
    {
      id: "item",
      type: "text",
      defaultValue: "",
      description: "Single item from the loop",
      name: "Item",
    },
  ],
  inputs: [
    {
      id: "list",
      type: "list",
      defaultValue: [],
      description: "List of items to loop over",
      name: "List",
    },
  ],
};
