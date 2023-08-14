import { Node } from "@pufflig/ps-types";

export const simpleNode: Node = {
  name: "simpleNode",
  parameters: [],
  inputs: [
    {
      name: "data",
      type: "text",
      defaultValue: "",
      description: "",
      id: "data",
    },
  ],
  outputs: [
    {
      name: "data",
      type: "text",
      defaultValue: "",
      description: "",
      id: "data",
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
      name: "data1",
      type: "text",
      defaultValue: "",
      description: "",
      id: "data1",
    },
    {
      name: "data2",
      type: "text",
      defaultValue: "",
      description: "",
      id: "data2",
    },
  ],
  outputs: [
    {
      name: "data1",
      type: "text",
      defaultValue: "",
      description: "",
      id: "data1",
    },
  ],
  execute: async (i) => i,
  parseInput: async (i) => i,
};

export const multiOutputNode: Node = {
  name: "multiOutputNode",
  parameters: [],
  inputs: [
    {
      name: "input1",
      type: "text",
      defaultValue: "",
      description: "",
      id: "input1",
    },
  ],
  outputs: [
    {
      name: "output1",
      type: "text",
      defaultValue: "",
      description: "",
      id: "output1",
    },
    {
      name: "output2",
      type: "text",
      defaultValue: "",
      description: "",
      id: "output2",
    },
  ],
  execute: async (i) => i,
  parseInput: async (i) => i,
};
