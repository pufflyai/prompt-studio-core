import { Edge, Node, Position } from "reactflow";
import { Chain } from "../types";

interface ReactFlowData {
  nodes: Node[];
  edges: Edge[];
}

/**
 * convert a chain to be used in react flow
 * @param chain
 */
export const chainToReactFlow = (chain: Chain): ReactFlowData => {
  const nodes: Node[] = Object.values(chain.definition.nodes).map((node) => {
    const nodeDefinition = chain.nodeTypes[node.type];

    const inputs = nodeDefinition.inputs.reduce(
      (acc, parameter) => ({
        ...acc,
        [parameter.id]: parameter.id,
      }),
      {}
    );

    const outputs = chain.nodeTypes[node.type].outputs.reduce(
      (acc, parameter) => ({
        ...acc,
        [parameter.id]: parameter.id,
      }),
      {}
    );

    const nodeData: Node = {
      id: node.id,
      type: "node",
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      data: {
        type: node.type,
        label: nodeDefinition.name,
        inputs,
        outputs,
      },
      position: node.editor.position || { x: 0, y: 0 },
    };
    return nodeData;
  });

  const edges: Edge[] = Object.values(chain.definition.edges).map((edge) => {
    const edgeData: Edge = {
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: "smoothstep",
      sourceHandle: edge.sourceHandle,
      targetHandle: edge.targetHandle,
    };
    return edgeData;
  });

  return {
    nodes,
    edges,
  };
};
