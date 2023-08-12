import { Chain } from "../types";
import { asyncNode, multiInputNode, simpleNode, templateNode } from "./nodes";

export const singleNodeChain: Chain = {
  nodeTypes: {
    simple_node: simpleNode,
  },
  definition: {
    edges: {},
    nodes: {
      "1": {
        id: "1",
        type: "simple_node",
        editor: {
          position: { x: 0, y: 0 },
        },
      },
    },
  },
  state: {
    "1": {
      input: {},
      status: "idle",
    },
  },
};

export const simpleChain: Chain = {
  nodeTypes: {
    simple_node: simpleNode,
    template_node: templateNode,
  },
  definition: {
    edges: {
      e1: {
        id: "e1",
        source: "n1",
        target: "n2",
        sourceHandle: "template",
        targetHandle: "template",
      },
      e2: {
        id: "e2",
        source: "n2",
        target: "n3",
        sourceHandle: "text",
        targetHandle: "prompt",
      },
    },
    nodes: {
      n1: {
        id: "n1",
        type: "simple_node",
        editor: {
          position: { x: 0, y: 0 },
        },
      },
      n2: {
        id: "n2",
        type: "template_node",
        editor: {
          position: { x: 0, y: 0 },
        },
      },
      n3: {
        id: "n3",
        type: "simple_node",
        editor: {
          position: { x: 0, y: 0 },
        },
      },
    },
  },
  state: {
    n1: {
      input: {},
      status: "idle",
    },
    n2: {
      input: {
        variables: [
          {
            id: "World",
            name: "World",
            description: "",
            type: "text",
            defaultValue: "mars",
          },
        ],
      },
      status: "idle",
    },
    n3: {
      input: {},
      status: "idle",
    },
  },
};

export const autorunExample: Chain = {
  nodeTypes: {
    simple_node: simpleNode,
    template_node: templateNode,
  },
  definition: {
    edges: {
      e1: {
        id: "e1",
        source: "n1",
        target: "n2",
        sourceHandle: "template",
        targetHandle: "template",
      },
      e2: {
        id: "e2",
        source: "n2",
        target: "n3",
        sourceHandle: "text",
        targetHandle: "prompt",
      },
    },
    nodes: {
      n1: {
        id: "n1",
        type: "simple_node",
        editor: {
          position: { x: 0, y: 0 },
        },
      },
      n2: {
        id: "n2",
        type: "template_node",
        autorun: false,
        editor: {
          position: { x: 0, y: 0 },
        },
      },
      n3: {
        id: "n3",
        type: "simple_node",
        editor: {
          position: { x: 0, y: 0 },
        },
      },
    },
  },
  state: {
    n1: {
      input: {},

      status: "idle",
    },
    n2: {
      input: {
        variables: [
          {
            id: "World",
            name: "World",
            description: "",
            type: "text",
            defaultValue: "mars",
          },
        ],
      },
      status: "idle",
    },
    n3: {
      input: {},
      status: "idle",
    },
  },
};

export const autorunRootExample: Chain = {
  nodeTypes: {
    simple_node: simpleNode,
    template_node: templateNode,
    multi_input_node: multiInputNode,
  },
  definition: {
    edges: {
      e1: {
        id: "e1",
        source: "n1",
        target: "n2",
        sourceHandle: "template",
        targetHandle: "template",
      },
      e2: {
        id: "e2",
        source: "n2",
        target: "n3",
        sourceHandle: "text",
        targetHandle: "prompt",
      },
    },
    nodes: {
      n1: {
        id: "n1",
        type: "simple_node",
        autorun: false,
        editor: {
          position: { x: 0, y: 0 },
        },
      },
      n2: {
        id: "n2",
        type: "template_node",
        editor: {
          position: { x: 0, y: 0 },
        },
      },
      n3: {
        id: "n3",
        type: "multi_input_node",
        editor: {
          position: { x: 0, y: 0 },
        },
      },
    },
  },
  state: {
    n1: {
      input: {},
      status: "idle",
    },
    n2: {
      input: {
        variables: [
          {
            id: "World",
            name: "World",
            description: "",
            type: "text",
            defaultValue: "mars",
          },
        ],
      },
      status: "idle",
    },
    n3: {
      input: {},
      status: "idle",
    },
  },
};

export const simpleLoop: Chain = {
  nodeTypes: {
    simple_node: simpleNode,
  },
  definition: {
    edges: {
      e1: {
        id: "e1",
        source: "n1",
        target: "n1",
        sourceHandle: "template",
        targetHandle: "template",
      },
    },
    nodes: {
      n1: {
        id: "n1",
        type: "simple_node",
        editor: {
          position: { x: 0, y: 0 },
        },
      },
    },
  },
  state: {
    "1": {
      input: {},
      status: "idle",
    },
  },
};

export const missingStates: Chain = {
  nodeTypes: {
    simple_node: simpleNode,
    template_node: templateNode,
    multi_input_node: multiInputNode,
    async_node: asyncNode,
  },
  definition: {
    nodes: {
      n1: {
        id: "n1",
        type: "simple_node",
        autorun: true,
        editor: { position: { x: 0, y: 0 } },
      },
      n2: {
        id: "n2",
        type: "template_node",
        autorun: true,
        editor: { position: { x: 0, y: 0 } },
      },
      n3: {
        id: "n3",
        type: "async_node",
        autorun: true,
        editor: { position: { x: 0, y: 0 } },
      },

      n4: {
        id: "n4",
        type: "multi_input_node",
        autorun: true,
        editor: { position: { x: 0, y: 0 } },
      },
    },
    edges: {
      e1: {
        id: "e1",
        source: "n1",
        target: "n2",
        sourceHandle: "template",
        targetHandle: "template",
      },
      e2: {
        id: "e2",
        source: "n2",
        target: "n3",
        sourceHandle: "text",
        targetHandle: "prompt",
      },
      e3: {
        id: "e3",
        source: "n2",
        target: "n4",
        sourceHandle: "text",
        targetHandle: "prompt",
      },
      e4: {
        id: "e4",
        source: "n3",
        target: "n4",
        sourceHandle: "completion",
        targetHandle: "completion",
      },
    },
  },
  state: {
    n3: {
      status: "idle",
      input: { template: "This is a test!" },
    },
  },
};

export const multiInput: Chain = {
  nodeTypes: {
    simple_node: simpleNode,
    template_node: templateNode,
    multi_input_node: multiInputNode,
  },
  definition: {
    nodes: {
      n1: {
        id: "n1",
        type: "simple_node",
        autorun: true,
        editor: { position: { x: 0, y: 0 } },
      },
      n2: {
        id: "n2",
        type: "template_node",
        autorun: true,
        editor: { position: { x: 0, y: 0 } },
      },
      n3: {
        id: "n3",
        type: "multi_input_node",
        autorun: true,
        editor: { position: { x: 0, y: 0 } },
      },
    },
    edges: {
      e1: {
        id: "e1",
        source: "n1",
        target: "n2",
        sourceHandle: "template",
        targetHandle: "template",
      },
      e2: {
        id: "e2",
        source: "n1",
        target: "n3",
        sourceHandle: "template",
        targetHandle: "prompt",
      },
      e3: {
        id: "e3",
        source: "n2",
        target: "n3",
        sourceHandle: "text",
        targetHandle: "completion",
      },
    },
  },
  state: {
    "1": {
      status: "idle",
      input: { template: "This is a test!" },
    },
  },
};
