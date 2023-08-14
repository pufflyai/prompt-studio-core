import { Chain } from "../types";
import { multiInputNode, simpleNode } from "./nodes";

export const singleNodeChain: Chain = {
  nodeTypes: {
    simple_node: simpleNode,
  },
  definition: {
    edges: {},
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
    n1: {
      input: {},
      status: "idle",
    },
  },
};

export const simpleChain: Chain = {
  nodeTypes: {
    simple_node: simpleNode,
  },
  definition: {
    edges: {
      e1: {
        id: "e1",
        source: "n1",
        target: "n2",
        sourceHandle: "data",
        targetHandle: "data",
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
        type: "simple_node",
        editor: {
          position: { x: 0, y: 0 },
        },
      },
    },
  },
  state: {},
};

export const autorunExample: Chain = {
  nodeTypes: {
    simple_node: simpleNode,
  },
  definition: {
    edges: {
      e1: {
        id: "e1",
        source: "n1",
        target: "n2",
        sourceHandle: "data",
        targetHandle: "data",
      },
      e2: {
        id: "e2",
        source: "n2",
        target: "n3",
        sourceHandle: "data",
        targetHandle: "data",
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
        type: "simple_node",
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
  state: {},
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
        sourceHandle: "data",
        targetHandle: "data",
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
  state: {},
};

export const simpleExistingState: Chain = {
  nodeTypes: {
    multi_input: multiInputNode,
  },
  definition: {
    nodes: {
      n1: {
        id: "n1",
        type: "multi_input",
        editor: { position: { x: 0, y: 0 } },
      },
    },
    edges: {},
  },
  state: {
    n1: {
      status: "idle",
      input: { data1: "REPLACE", data2: "KEEP" },
    },
  },
};

export const mappedExample: Chain = {
  nodeTypes: {
    simple_node: simpleNode,
    multi_input: multiInputNode,
  },
  definition: {
    edges: {
      e1: {
        id: "e1",
        source: "n1",
        target: "n2",
        sourceHandle: "data",
        targetHandle: "data1",
      },
      e2: {
        id: "e2",
        source: "n2",
        target: "n3",
        sourceHandle: "data1",
        targetHandle: "data",
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
        type: "multi_input",
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
  state: {},
};

export const existingState: Chain = {
  nodeTypes: {
    simple_node: simpleNode,
    multi_node: multiInputNode,
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
    multi_input_node: multiInputNode,
  },
  definition: {
    nodes: {
      n1: {
        id: "n1",
        type: "simple_node",
        editor: { position: { x: 0, y: 0 } },
      },
      n2: {
        id: "n2",
        type: "simple_node",
        editor: { position: { x: 0, y: 0 } },
      },
      n3: {
        id: "n3",
        type: "multi_input_node",
        editor: { position: { x: 0, y: 0 } },
      },
    },
    edges: {
      e1: {
        id: "e1",
        source: "n1",
        target: "n2",
        sourceHandle: "data",
        targetHandle: "data",
      },
      e2: {
        id: "e2",
        source: "n1",
        target: "n3",
        sourceHandle: "data",
        targetHandle: "data1",
      },
      e3: {
        id: "e3",
        source: "n2",
        target: "n3",
        sourceHandle: "data",
        targetHandle: "data2",
      },
    },
  },
  state: {},
};

export const multiInputWithOutput: Chain = {
  nodeTypes: {
    simple_node: simpleNode,
    multi_input_node: multiInputNode,
  },
  definition: {
    nodes: {
      n1: {
        id: "n1",
        type: "simple_node",
        editor: { position: { x: 0, y: 0 } },
      },
      n2: {
        id: "n2",
        type: "simple_node",
        editor: { position: { x: 0, y: 0 } },
      },
      n3: {
        id: "n3",
        type: "multi_input_node",
        editor: { position: { x: 0, y: 0 } },
      },
      n4: {
        id: "n4",
        type: "simple_node",
        editor: { position: { x: 0, y: 0 } },
      },
    },
    edges: {
      e1: {
        id: "e1",
        source: "n1",
        target: "n2",
        sourceHandle: "data",
        targetHandle: "data",
      },
      e2: {
        id: "e2",
        source: "n1",
        target: "n3",
        sourceHandle: "data",
        targetHandle: "data1",
      },
      e3: {
        id: "e3",
        source: "n2",
        target: "n3",
        sourceHandle: "data",
        targetHandle: "data2",
      },
      e4: {
        id: "e4",
        source: "n3",
        target: "n4",
        sourceHandle: "data1",
        targetHandle: "data",
      },
    },
  },
  state: {},
};

export const multistep: Chain = {
  nodeTypes: {
    simple_node: simpleNode,
    multi_input_node: multiInputNode,
  },
  definition: {
    nodes: {
      n1: {
        id: "n1",
        type: "simple_node",
        editor: { position: { x: 0, y: 0 } },
      },
      n2: {
        id: "n2",
        type: "simple_node",
        editor: { position: { x: 0, y: 0 } },
      },
      n3: {
        id: "n3",
        type: "simple_node",
        editor: { position: { x: 0, y: 0 } },
      },
      n4: {
        id: "n4",
        type: "multi_input_node",
        editor: { position: { x: 0, y: 0 } },
      },
      n5: {
        id: "n5",
        type: "simple_node",
        editor: { position: { x: 0, y: 0 } },
      },
    },
    edges: {
      e1: {
        id: "e1",
        source: "n1",
        target: "n2",
        sourceHandle: "data",
        targetHandle: "data",
      },
      e2: {
        id: "e2",
        source: "n2",
        target: "n3",
        sourceHandle: "data",
        targetHandle: "data",
      },
      e3: {
        id: "e3",
        source: "n3",
        target: "n4",
        sourceHandle: "data",
        targetHandle: "data2",
      },
      e4: {
        id: "e4",
        source: "n1",
        target: "n4",
        sourceHandle: "data",
        targetHandle: "data1",
      },
      e5: {
        id: "e1",
        source: "n4",
        target: "n5",
        sourceHandle: "data1",
        targetHandle: "data",
      },
    },
  },
  state: {},
};

export const simpleChainWithVars: Chain = {
  nodeTypes: {
    simple_node: simpleNode,
  },
  definition: {
    edges: {
      e1: {
        id: "e1",
        source: "n1",
        target: "n2",
        sourceHandle: "data",
        targetHandle: "data",
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
        type: "simple_node",
        editor: {
          position: { x: 0, y: 0 },
        },
      },
    },
  },
  state: {
    n1: {
      input: {
        data: "${{ps:ref:file:MY_FILE}} {{keep}}",
      },
      status: "idle",
    },
  },
};
