import { NodeConfig } from "@pufflig/ps-types";

export const parseDocumentNodeType = "modifier/parse_document" as const;

export const parseDocument: NodeConfig = {
  name: "Parse Document",
  description: "Run a prompt over a document",
  tags: ["modifier", "document", "text"],
  status: "experimental",
  outputs: [
    {
      id: "text",
      name: "Text",
      description: "The parsed output",
      type: "text",
      defaultValue: "",
    },
  ],
  inputs: [
    {
      id: "prompt",
      name: "Prompt",
      description: "Prompt to parse the document with",
      type: "text",
      defaultValue: "",
    },
    {
      id: "document",
      name: "Document",
      description: "Document to be processed",
      type: "text",
      defaultValue: "",
    },
    {
      id: "join",
      name: "Join Instruction",
      description: "Describe how the output should assembled if the document was to long",
      type: "text",
      defaultValue: "Join the sections below, keep values that have already been set.",
    },
  ],
};
