import "reactflow/dist/style.css";

import { Flow } from "@pufflig/ps-chains";
import { useCallback } from "react";
import { ReactFlow, addEdge, useEdgesState, useNodesState } from "reactflow";
import { CoreNode } from "../CoreNode/CoreNode";
import { CustomNode } from "../CustomNode/CustomNode";
import { Box } from "@chakra-ui/react";
import { chainToReactFlow } from "../../utils/chainToReactFlow";

interface NodeEditorProps {
  chain: Flow;
}

const nodeTypes = {
  ["node"]: CustomNode,
  ["core"]: CoreNode,
};

export function NodeEditor(props: NodeEditorProps) {
  const { chain } = props;
  const { nodes: initialNodes, edges: initialEdges } = chainToReactFlow(chain);

  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <Box style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        fitView
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      />
    </Box>
  );
}
