import { NodeConfig } from "@pufflig/ps-types";

export const addTextNodeType = "modifier/add_text" as const;

export const addText: NodeConfig = {
  name: "Add Text",
  description: "Add tex to a list",
  tags: ["modifier", "list", "text"],
  status: "experimental",
  outputs: [
    {
      id: "list",
      name: "List",
      description: "The list with the appended text",
      type: "list",
      defaultValue: [],
    },
  ],
  inputs: [
    {
      id: "list",
      name: "List",
      description: "The list to append the text to",
      type: "list",
      defaultValue: [],
    },
    {
      id: "text",
      name: "Text",
      description: "Text to append to the list",
      type: "text",
      defaultValue: "",
    },
  ],
};
