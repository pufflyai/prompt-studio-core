import { FlowDefinition, FlowEdge } from "../../../types";

/**
 * recursively get all nodes that are reachable from a node
 * @param nodeId
 * @param flow_definition
 * @returns
 */
export function getReachableNodes(nodeId: string, flow_definition: FlowDefinition) {
  const edges = flow_definition.edges;
  const reachableNodes = new Set<string>();

  function _getReachableNodes(nodeId: string) {
    reachableNodes.add(nodeId);
    const targetNodes = Object.values(edges)
      // do not consider self to be a valid target
      .filter((edge: FlowEdge) => edge.source === nodeId && edge.target !== nodeId)
      .map((edge) => edge.target);

    targetNodes.forEach((targetNode) => {
      _getReachableNodes(targetNode);
    });
  }

  _getReachableNodes(nodeId);

  return reachableNodes;
}
