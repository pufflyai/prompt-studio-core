import { Node } from "@pufflig/ps-types";

export const simpleNode: Node = {
  name: "data",
  parameters: [],
  inputs: [
    {
      name: "template",
      type: "text",
      defaultValue: "",
      description: "Template",
      id: "template",
    },
  ],
  outputs: [
    {
      name: "template",
      type: "text",
      defaultValue: "",
      description: "Template",
      id: "template",
    },
  ],
  execute: async (i) => i,
  parseInput: async (i) => i,
};

export const multiInputNode: Node = {
  name: "multiInputNode",
  parameters: [],
  inputs: [
    {
      name: "prompt",
      type: "text",
      defaultValue: "",
      description: "",
      id: "prompt",
    },
    {
      name: "completion",
      type: "text",
      defaultValue: "",
      description: "",
      id: "completion",
    },
  ],
  outputs: [],
  execute: async (i) => i,
  parseInput: async (i) => i,
};

export const templateNode: Node = {
  name: "template",
  parameters: [],
  inputs: [
    {
      name: "template",
      type: "text",
      defaultValue: "",
      description: "Template",
      id: "template",
    },
  ],
  outputs: [
    {
      name: "text",
      type: "text",
      defaultValue: "",
      description: "Parsed Template",
      id: "text",
    },
  ],
  execute: async (i) => ({
    text: i.template + " (PARSED)",
  }),
  parseInput: async (i) => i,
};

export const asyncNode: Node = {
  name: "asyncNode",
  parameters: [],
  inputs: [
    {
      name: "prompt",
      type: "text",
      defaultValue: "",
      description: "",
      id: "prompt",
    },
  ],
  outputs: [
    {
      name: "completion",
      type: "text",
      defaultValue: "",
      description: "",
      id: "completion",
    },
  ],
  execute: async (i) => ({
    completion: i.prompt + " (COMPLETION)",
  }),
  parseInput: async (i) => i,
};
