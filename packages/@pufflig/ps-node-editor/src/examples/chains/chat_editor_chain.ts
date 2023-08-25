import { nodes } from "@pufflig/ps-nodes";

export const chat_editor_chain = {
  nodeTypes: nodes,
  definition: {
    nodes: {
      "1": {
        id: "1",
        type: "core/output",
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
        type: "modifier/append_to_chat",
        autorun: true,
        editor: {
          position: {
            x: 0,
            y: 0,
          },
        },
      },
      "3": {
        id: "3",
        type: "adapter/openai_chat",
        autorun: true,
        editor: {
          position: {
            x: 0,
            y: 0,
          },
        },
      },
      "4": {
        id: "4",
        type: "modifier/append_to_chat",
        autorun: true,
        editor: {
          position: {
            x: 0,
            y: 0,
          },
        },
      },
      "5": {
        id: "5",
        type: "core/input",
        autorun: true,
        editor: {
          position: {
            x: 0,
            y: 0,
          },
        },
      },
    },
    edges: {
      e12: {
        id: "e12",
        source: "5",
        target: "4",
        sourceHandle: "messageId",
        targetHandle: "messageId",
      },
      e11: {
        id: "e11",
        source: "5",
        target: "4",
        sourceHandle: "chat",
        targetHandle: "chat",
      },
      e1: {
        id: "e1",
        source: "5",
        target: "4",
        sourceHandle: "message",
        targetHandle: "message",
      },

      e2: {
        id: "e2",
        source: "4",
        target: "3",
        sourceHandle: "chat",
        targetHandle: "chat",
      },
      e3: {
        id: "e3",
        source: "3",
        target: "2",
        sourceHandle: "message",
        targetHandle: "message",
      },
      e4: {
        id: "e4",
        source: "2",
        target: "1",
        sourceHandle: "chat",
        targetHandle: "chat",
      },
      e5: {
        id: "e5",
        source: "4",
        target: "2",
        sourceHandle: "chat",
        targetHandle: "chat",
      },
      e6: {
        id: "e6",
        source: "5",
        target: "3",
        sourceHandle: "model",
        targetHandle: "model",
      },
    },
  },
  state: {},
};
