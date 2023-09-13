import { NodeConfig } from "@pufflig/ps-types";

export const splitTextNodeType = "modifier/split_text" as const;

export const splitText: NodeConfig = {
  name: "Split Text",
  description: "[NOT IMPLEMENTED] Can be used to split a text in sections",
  tags: ["modifier", "text", "split"],
  outputs: [
    {
      id: "list",
      name: "List",
      description: "List of the parts that the text was split into.",
      type: "list",
      defaultValue: [],
    },
  ],
  inputs: [
    {
      id: "text",
      name: "Text",
      description: "The text to be split.",
      type: "text",
      defaultValue: "",
    },
  ],
};
