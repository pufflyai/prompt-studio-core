import { Node, NodeActions } from "@pufflig/ps-types";

export const passthroughNode: NodeActions = {
  execute: async (i) => i,
  mapInput: async (i) => i,
};

export const simpleDataNode: Node = {
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
  ...passthroughNode,
};

export const configOnlyNode: Node = {
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
};

export const multiInputDataNode: Node = {
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
  ...passthroughNode,
};

export const multiOutputDataNode: Node = {
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
  ...passthroughNode,
};

export const simpleExecNode: Node = {
  name: "simpleNode",
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
  ...passthroughNode,
};
