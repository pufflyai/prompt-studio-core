import { NodeConfig } from "@pufflig/ps-types";

export const splitTextNodeType = "modifier/split_text" as const;

export const splitText: NodeConfig = {
  name: "Split Text",
  description: "Can be used to split text into sections.",
  tags: ["modifier", "text", "split"],
  status: "experimental",
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
      id: "method",
      name: "Method",
      description: "How should the text be split.",
      type: "selection",
      defaultValue: "paragraph",
      options: [{ id: "paragraph", name: "paragraph" }],
    },
    {
      id: "chunkSize",
      name: "Chunk Size",
      description: "How many characters each chunk should have.",
      type: "number",
      defaultValue: 1200,
      min: 1,
    },
    {
      id: "text",
      name: "Text",
      description: "The text to be split.",
      type: "text",
      defaultValue: "",
    },
  ],
};
