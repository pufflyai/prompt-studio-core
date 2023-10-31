import { NodeConfig } from "@pufflig/ps-types";

export const parseDocumentNodeType = "modifier/parse_document" as const;

export const parseDocument: NodeConfig = {
  name: "Parse Document",
  description: "Run a prompt over a document",
  tags: ["modifier", "document", "text"],
  status: "deprecated",
  execution: {
    inputs: [
      {
        id: "exec:input",
      },
    ],
    outputs: [
      {
        id: "exec:output",
        name: "Completed",
      },
    ],
  },
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
      defaultValue: "Summarize the following:\n[[document]]",
    },
    {
      id: "join",
      name: "Join Instruction",
      description:
        "Describe how the output should be put together if the document was to long. Leave empty if you don't want to join the outputs.",
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
  ],
};
