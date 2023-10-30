import { NodeConfig } from "@pufflig/ps-types";

export const textNodeType = "data/text" as const;

export const text: NodeConfig = {
  name: "File",
  description: "Can be used to store text.",
  tags: ["data", "text"],
  status: "stable",
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
