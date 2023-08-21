import { nodes } from "@pufflig/ps-nodes";

export const empty_chain = {
  nodeTypes: nodes,
  definition: {
    nodes: {
      "1": {
        id: "1",
        type: "core/input",
        autorun: true,
        editor: {
          position: {
            x: 0,
            y: 0,
          },
        },
      },
      "2": {
        id: "2",
        type: "core/output",
        autorun: true,
        editor: {
          position: {
            x: 250,
            y: 0,
          },
        },
      },
    },
    edges: {},
  },
  state: {},
};
