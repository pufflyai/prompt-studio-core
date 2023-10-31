import { chat_models, completion_models, default_completion_model } from "@pufflig/ps-models";
import { NodeConfig } from "@pufflig/ps-types";

export const documentCheckNodeType = "modifier/document_check" as const;

export const documentCheck: NodeConfig = {
  name: "Document Check",
  description: "Run a checklist or extract information from a document.",
  tags: ["modifier", "document", "text"],
  status: "stable",
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
      id: "list",
      name: "List",
      description: "A list, checklist or other information about the document",
      type: "text",
      defaultValue: "",
    },
  ],
  inputs: [
    {
      id: "model",
      name: "Model",
      description: "The model to use",
      type: "model",
      definition: { ...completion_models, ...chat_models },
      defaultValue: {
        modelId: default_completion_model,
        parameters: {},
      },
    },
    {
      id: "prompt",
      name: "Prompt",
      description: "Prompt to check the document with",
      type: "text",
      defaultValue: `Extract information in the document below and insert them in the csv table, don't overwrite existing values and keep things empty if you cannot find information in the document:\n\nTABLE EXAMPLE:\ncharacters, age\nmickey mouse, 10\ndonald duck, -\n\nTABLE:\n[[table]]\n\nDOCUMENT:\n[[document]]\n\nTABLE:\n`,
    },
    {
      id: "table",
      name: "Table",
      description: "The list, table or checklist to parse the document with.",
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
