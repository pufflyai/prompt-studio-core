import { NodeConfig } from "@pufflig/ps-types";

export const textNodeType = "data/text" as const;

export const text: NodeConfig = {
  name: "Text",
  description: "Text data",
  tags: ["data", "text"],
  parameters: [],
  outputs: [
    {
      id: "text",
      name: "Text",
      description: "",
      type: "text",
      defaultValue: "",
    },
  ],
  inputs: [
    {
      id: "text",
      name: "Text",
      description: "",
      type: "text",
      defaultValue: "",
    },
  ],
};
