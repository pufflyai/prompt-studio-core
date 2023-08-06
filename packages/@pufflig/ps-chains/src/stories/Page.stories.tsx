import { useCallback } from "react";
import ReactFlow, { addEdge, useEdgesState, useNodesState } from "reactflow";
import "reactflow/dist/style.css";
import { Chain } from "../types";
import { chainToReactFlow } from "../utils/chainToReactFlow";

const chain: Chain = {
  definition: {
    edges: [
      {
        id: "1",
        source: "1",
        target: "2",
        source_handle: "text",
        target_handle: "template",
      },
      {
        id: "2",
        source: "2",
        target: "3",
        source_handle: "text",
        target_handle: "input",
      },
    ],
    nodes: [
      {
        id: "1",
        type: "input/template_editor",
        editor: {
          position: { x: 0, y: 0 },
        },
      },
      {
        id: "2",
        type: "modifier/handlebar_template_completion",
        editor: {
          position: { x: 0, y: 0 },
        },
      },
      {
        id: "3",
        type: "output/completion_display",
        editor: {
          position: { x: 0, y: 0 },
        },
      },
    ],
  },
  state: {
    "1": {
      status: "idle",
      data: {},
    },
    "2": {
      status: "idle",
      data: {},
    },
    "3": {
      status: "idle",
      data: {},
    },
  },
};

function Page() {
  const { nodes: initialNodes, edges: initialEdges } = chainToReactFlow(chain);

  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        fitView
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      />
    </div>
  );
}

export default {
  title: "Example/Page",
  component: Page,
  parameters: {
    layout: "fullscreen",
  },
};

export const Example = {};
