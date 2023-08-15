import { Edge, MarkerType, Node, Position } from "reactflow";
import { Chain } from "../types";
import _ from "lodash";

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

    const isCoreNode = node.type.split("/")[0] === "core";
    const coreParameters: Record<string, string> = {};

    // if it is a core node, the inputs/outputs depend on the edges
    if (isCoreNode) {
      const inputs = Object.values(chain.definition.edges)
        .filter((edge) => edge.target === node.id)
        .map((edge) => {
          const node = chain.definition.nodes[edge.source];
          const nodeDefinition = chain.nodeTypes[node.type];
          return nodeDefinition.outputs.filter((input) => input.id === edge.targetHandle);
        });

      const outputs = Object.values(chain.definition.edges)
        .filter((edge) => edge.source === node.id)
        .map((edge) => {
          const node = chain.definition.nodes[edge.target];
          const nodeDefinition = chain.nodeTypes[node.type];
          return nodeDefinition.inputs.filter((input) => input.id === edge.targetHandle);
        });

      _.flatten([...inputs, ...outputs]).forEach((parameter) => {
        coreParameters[parameter.id] = parameter.id;
      });
    }

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
      type: isCoreNode ? "core" : "node",
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      data: {
        type: node.type,
        label: nodeDefinition.name,
        parameters: isCoreNode ? coreParameters : nodeDefinition.parameters,
        inputs: inputs,
        outputs: outputs,
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
      markerEnd: {
        type: MarkerType.Arrow,
        width: 16,
        height: 16,
      },
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
