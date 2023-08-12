import { useCallback } from "react";
import ReactFlow, { addEdge, useEdgesState, useNodesState } from "reactflow";
import "reactflow/dist/style.css";
import { multiInput } from "../mocks/chains";
import { chainToReactFlow } from "../utils/chainToReactFlow";

function Page() {
  const { nodes: initialNodes, edges: initialEdges } = chainToReactFlow(multiInput);

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
