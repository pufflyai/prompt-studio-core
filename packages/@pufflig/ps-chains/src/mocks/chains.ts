import { Flow } from "../types";
import {
  configOnlyNode,
  joinNodeConfig,
  loopNodeConfig,
  multiInputDataNode,
  passthroughNode,
  simpleDataNode,
  simpleExecNode,
  startNode,
} from "./nodes";

export const singleNodeFlow: Flow = {
  nodeTypes: {
    simple_node: simpleDataNode,
  },
  definition: {
    edges: {},
    nodes: {
      n1: {
        id: "n1",
        type: "simple_node",
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

export const configOnlyFlow: Flow = {
  nodeTypes: {
    simple_node: configOnlyNode,
  },
  definition: {
    edges: {},
    nodes: {
      n1: {
        id: "n1",
        type: "simple_node",
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

export const simpleFlow: Flow = {
  nodeTypes: {
    simple_node: simpleDataNode,
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
      },
      n2: {
        id: "n2",
        type: "simple_node",
      },
    },
  },
  state: {},
};

export const simpleLoop: Flow = {
  nodeTypes: {
    simple_node: simpleDataNode,
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
      },
    },
  },
  state: {},
};

export const simpleExistingState: Flow = {
  nodeTypes: {
    multi_input: multiInputDataNode,
  },
  definition: {
    nodes: {
      n1: {
        id: "n1",
        type: "multi_input",
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

export const mappedExample: Flow = {
  nodeTypes: {
    simple_node: simpleDataNode,
    multi_input: multiInputDataNode,
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
      },
      n2: {
        id: "n2",
        type: "multi_input",
      },
      n3: {
        id: "n3",
        type: "simple_node",
      },
    },
  },
  state: {},
};

export const existingState: Flow = {
  nodeTypes: {
    simple_node: simpleDataNode,
    multi_node: multiInputDataNode,
  },
  definition: {
    nodes: {
      n1: {
        id: "n1",
        type: "simple_node",
      },
      n2: {
        id: "n2",
        type: "template_node",
      },
      n3: {
        id: "n3",
        type: "async_node",
      },

      n4: {
        id: "n4",
        type: "multi_input_node",
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

export const multiInput: Flow = {
  nodeTypes: {
    simple_node: simpleDataNode,
    multi_input: multiInputDataNode,
  },
  definition: {
    nodes: {
      n1: {
        id: "n1",
        type: "simple_node",
      },
      n2: {
        id: "n2",
        type: "simple_node",
      },
      n3: {
        id: "n3",
        type: "multi_input",
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

export const multiInputWithOutput: Flow = {
  nodeTypes: {
    simple_node: simpleDataNode,
    multi_input: multiInputDataNode,
  },
  definition: {
    nodes: {
      n1: {
        id: "n1",
        type: "simple_node",
      },
      n2: {
        id: "n2",
        type: "simple_node",
      },
      n3: {
        id: "n3",
        type: "multi_input",
      },
      n4: {
        id: "n4",
        type: "simple_node",
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

export const multistep: Flow = {
  nodeTypes: {
    simple_node: simpleDataNode,
    multi_input: multiInputDataNode,
  },
  definition: {
    nodes: {
      n1: {
        id: "n1",
        type: "simple_node",
      },
      n2: {
        id: "n2",
        type: "simple_node",
      },
      n3: {
        id: "n3",
        type: "simple_node",
      },
      n4: {
        id: "n4",
        type: "multi_input",
      },
      n5: {
        id: "n5",
        type: "simple_node",
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

export const simpleFlowWithVars: Flow = {
  nodeTypes: {
    simple_node: simpleDataNode,
    multi_node: multiInputDataNode,
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
      },
      n2: {
        id: "n2",
        type: "simple_node",
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

export const simpleFlowWithExec: Flow = {
  nodeTypes: {
    simple_node: simpleExecNode,
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
      },
      n2: {
        id: "n2",
        type: "simple_node",
      },
      n3: {
        id: "n3",
        type: "simple_node",
      },
    },
  },
  state: {},
};

export const simpleExec: Flow = {
  nodeTypes: {
    start_node: startNode,
    simple_node: simpleExecNode,
  },
  definition: {
    edges: {
      e1: {
        id: "e1",
        source: "n1",
        target: "n2",
        sourceHandle: "exec:output",
        targetHandle: "exec:input",
      },
      e2: {
        id: "e2",
        source: "n2",
        target: "n3",
        sourceHandle: "exec:output",
        targetHandle: "exec:input",
      },
    },
    nodes: {
      n1: {
        id: "n1",
        type: "start_node",
      },
      n2: {
        id: "n2",
        type: "simple_node",
      },
      n3: {
        id: "n3",
        type: "simple_node",
      },
    },
  },
  state: {},
};

export const simpleExecWithData: Flow = {
  nodeTypes: {
    start_node: startNode,
    simple_node: simpleExecNode,
  },
  definition: {
    edges: {
      e1: {
        id: "e1",
        source: "n1",
        target: "n2",
        sourceHandle: "exec:output",
        targetHandle: "exec:input",
      },
      e2: {
        id: "e2",
        source: "n2",
        target: "n3",
        sourceHandle: "exec:output",
        targetHandle: "exec:input",
      },
      e3: {
        id: "e3",
        source: "n1",
        target: "n2",
        sourceHandle: "data",
        targetHandle: "data",
      },
      e4: {
        id: "e4",
        source: "n2",
        target: "n3",
        sourceHandle: "data",
        targetHandle: "data",
      },
    },
    nodes: {
      n1: {
        id: "n1",
        type: "start_node",
      },
      n2: {
        id: "n2",
        type: "simple_node",
      },
      n3: {
        id: "n3",
        type: "simple_node",
      },
    },
  },
  state: {},
};

export const execWithLoop: Flow = {
  nodeTypes: {
    start_node: startNode,
    simple_node: simpleExecNode,
    loop_node: loopNodeConfig,
  },
  definition: {
    edges: {
      e1: {
        id: "e1",
        source: "n1",
        target: "n2",
        sourceHandle: "exec:output",
        targetHandle: "exec:input",
      },
      e2: {
        id: "e2",
        source: "n2",
        target: "n3",
        sourceHandle: "exec:output",
        targetHandle: "exec:input",
      },
      e3: {
        id: "e3",
        source: "n2",
        target: "n3",
        sourceHandle: "data",
        targetHandle: "data",
      },
      e4: {
        id: "e4",
        source: "n3",
        target: "n4",
        sourceHandle: "data",
        targetHandle: "data",
      },
    },
    nodes: {
      n1: {
        id: "n1",
        type: "start_node",
      },
      n2: {
        id: "n2",
        type: "loop_node",
      },
      n3: {
        id: "n3",
        type: "simple_node",
      },
      n4: {
        id: "n4",
        type: "simple_node",
      },
    },
  },
  state: {
    n2: {
      status: "idle",
      input: {
        list: ["a", "b"],
      },
    },
  },
};

export const loopWithJoin: Flow = {
  nodeTypes: {
    start_node: startNode,
    simple_node: simpleExecNode,
    loop_node: loopNodeConfig,
    join_node: joinNodeConfig,
  },
  definition: {
    edges: {
      e0: {
        id: "e0",
        source: "n0",
        target: "n1",
        sourceHandle: "exec:output",
        targetHandle: "exec:input",
      },
      e1: {
        id: "e1",
        source: "n1",
        target: "n2",
        sourceHandle: "exec:output",
        targetHandle: "exec:input",
      },
      e2: {
        id: "e2",
        source: "n2",
        target: "n3",
        sourceHandle: "exec:output",
        targetHandle: "exec:input",
      },
      e3: {
        id: "e3",
        source: "n1",
        target: "n2",
        sourceHandle: "data",
        targetHandle: "data",
      },
      e4: {
        id: "e4",
        source: "n2",
        target: "n3",
        sourceHandle: "list",
        targetHandle: "data",
      },
    },
    nodes: {
      n0: {
        id: "n0",
        type: "start_node",
      },
      n1: {
        id: "n1",
        type: "loop_node",
      },
      n2: {
        id: "n2",
        type: "join_node",
      },
      n3: {
        id: "n3",
        type: "simple_node",
      },
    },
  },
  state: {
    n1: {
      status: "idle",
      input: {
        list: ["a", "b"],
      },
    },
  },
};

export const severalConnections: Flow = {
  nodeTypes: {
    simple_node: simpleDataNode,
    multi_node: multiInputDataNode,
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
        source: "n1",
        target: "n2",
        sourceHandle: "data",
        targetHandle: "data2",
      },
    },
    nodes: {
      n1: {
        id: "n1",
        type: "simple_node",
      },
      n2: {
        id: "n2",
        type: "multi_node",
      },
    },
  },
  state: {},
};

export const multiNodes: Flow = {
  nodeTypes: {
    multi_output_node: {
      name: "multiOutputNode",
      inputs: [
        {
          name: "data1",
          type: "text",
          defaultValue: "DEFAULT_DATA_1",
          description: "",
          id: "data1",
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
        {
          name: "data2",
          type: "text",
          defaultValue: "",
          description: "",
          id: "data2",
        },
      ],
      ...passthroughNode,
    },
    multi_input_node: {
      name: "multiInputNode",
      inputs: [
        {
          name: "data1",
          type: "text",
          defaultValue: "DEFAULT_DATA_1",
          description: "",
          id: "data1",
        },
        {
          name: "data2",
          type: "text",
          defaultValue: "DEFAULT_DATA_2",
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
    },
  },
  definition: {
    edges: {
      e1: {
        id: "e1",
        source: "n1",
        target: "n2",
        sourceHandle: "data1",
        targetHandle: "data1",
      },
      e2: {
        id: "e2",
        source: "n1",
        target: "n2",
        sourceHandle: "data2",
        targetHandle: "data2",
      },
    },
    nodes: {
      n1: {
        id: "n1",
        type: "multi_output_node",
      },
      n2: {
        id: "n2",
        type: "multi_input_node",
      },
    },
  },
  state: {},
};
