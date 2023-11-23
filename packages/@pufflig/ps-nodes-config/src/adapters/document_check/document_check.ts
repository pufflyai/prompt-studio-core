import { default_completion_model, models } from "@pufflig/ps-models";
import { NodeConfig } from "@pufflig/ps-types";

export const documentCheckNodeType = "modifier/document_check" as const;

export const documentCheck: NodeConfig = {
  name: "Checklist",
  description: "Run a checklist on a document.",
  tags: ["adapter", "document", "text"],
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
      id: "checklist",
      name: "Checklist",
      description: "A checklist of items to run on the document",
      type: "text",
      defaultValue: "",
    },
  ],
  inputs: [
    {
      id: "model",
      name: "AI Settings",
      description: "The model to use",
      type: "model",
      definition: models,
      defaultValue: {
        modelId: default_completion_model,
        parameters: {},
      },
    },
    {
      id: "instructions",
      name: "Instructions",
      description: "Instructions for the AI",
      type: "text",
      defaultValue: ``,
    },
    {
      id: "document",
      name: "Document",
      description: "Document to be checked",
      type: "text",
      defaultValue: "",
    },
    {
      id: "checks",
      name: "Checks",
      description: "The checklist to run on the document",
      type: "object",
      editableSchema: true,
      defaultValue: [],
    },
    {
      id: "fields",
      name: "Fields",
      description: "Custom fields to include in the output for each checklist item",
      type: "list",
      defaultValue: ["ok (yes/no)"],
    },
    {
      id: "format",
      name: "Format",
      description: "The format in which to return the cheklist results",
      type: "selection",
      defaultValue: "markdown",
      options: [
        { id: "csv", name: "CSV" },
        { id: "markdown", name: "Markdown" },
      ],
    },
  ],
};
