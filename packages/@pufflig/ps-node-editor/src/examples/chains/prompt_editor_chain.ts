import { nodes } from "@pufflig/ps-nodes";

export const inputId = "n2";
export const adapterId = "n3";

export const prompt_editor_chain = {
  nodeTypes: nodes,
  definition: {
    nodes: {
      n1: {
        id: "n1",
        type: "core/output",
        autorun: true,
        editor: {
          position: {
            x: 500,
            y: 500,
          },
        },
      },
      n3: {
        id: "n3",
        type: "adapter/openai_completion",
        autorun: true,
        editor: {
          position: {
            x: 200,
            y: 200,
          },
        },
      },
      n2: {
        id: "n2",
        type: "core/input",
        autorun: true,
        editor: {
          position: {
            x: 0,
            y: 0,
          },
        },
      },
      n4: {
        id: "n4",
        type: "modifier/handlebar_template_completion",
        autorun: true,
        editor: {
          position: {
            x: 300,
            y: 300,
          },
        },
      },
    },
    edges: {
      e1: {
        id: "e1",
        source: "n4",
        target: "n3",
        sourceHandle: "text",
        targetHandle: "prompt",
      },
      e2: {
        id: "e2",
        source: "n4",
        target: "n1",
        sourceHandle: "text",
        targetHandle: "text",
      },
      e3: {
        id: "e3",
        source: "n3",
        target: "n1",
        sourceHandle: "completion",
        targetHandle: "completion",
      },
      e4: {
        id: "e4",
        source: "n2",
        target: "n4",
        sourceHandle: "template",
        targetHandle: "template",
      },
      e5: {
        id: "e5",
        source: "n2",
        target: "n4",
        sourceHandle: "variables",
        targetHandle: "variables",
      },
      e6: {
        id: "e6",
        source: "n2",
        target: "n3",
        sourceHandle: "model",
        targetHandle: "model",
      },
    },
  },
  state: {},
};
