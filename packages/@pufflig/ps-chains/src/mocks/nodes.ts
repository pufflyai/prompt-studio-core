import { Node, NodeActions } from "@pufflig/ps-types";

export const passthroughNode: NodeActions = {
  execute: async (i) => i,
  mapInput: async (i) => i,
};

export const loopNode: NodeActions = {
  getTargets: async ({ list }) => {
    return [
      { execSource: "exec:output", inputs: { data: list?.[0] } },
      { execSource: "exec:output", inputs: { data: list?.[1] } },
      { execSource: "exec:complete", inputs: {} },
    ];
  },
};

export const joinNode: NodeActions<{ data: string; list: string[] }> = {
  mapInput: async ({ data }, options) => {
    return { list: [...(options?.prevInput?.list || []), data] };
  },
};

export const simpleDataNode: Node = {
  name: "simpleNode",
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

export const startNode: Node = {
  name: "startNode",
  execution: {
    inputs: [],
    outputs: [
      {
        id: "exec:output",
        name: "Completed",
      },
    ],
  },
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

export const loopNodeConfig: Node = {
  name: "loopNode",
  execution: {
    inputs: [
      {
        id: "exec:input",
      },
    ],
    outputs: [
      {
        id: "exec:output",
      },
    ],
  },
  inputs: [
    {
      name: "list",
      type: "list",
      defaultValue: [],
      description: "",
      id: "list",
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
  ...loopNode,
};

export const joinNodeConfig: Node = {
  name: "joinNode",
  execution: {
    inputs: [
      {
        id: "exec:input",
      },
    ],
    outputs: [
      {
        id: "exec:output",
      },
    ],
  },
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
      name: "list",
      type: "list",
      defaultValue: [],
      description: "",
      id: "list",
    },
  ],
  ...joinNode,
};
