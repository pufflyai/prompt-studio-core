import { NodeConfig } from "@pufflig/ps-types";

export const textNodeType = "data/text" as const;

export const text: NodeConfig = {
  name: "Text",
  description: "Can be used to store text, e.g. from a prompt or a file.",
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
