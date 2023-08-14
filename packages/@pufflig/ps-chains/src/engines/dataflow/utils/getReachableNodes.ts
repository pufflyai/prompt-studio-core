import { Chain, ChainEdge } from "../../../types";

/**
 * recursively get all nodes that are reachable from a node
 * @param nodeId
 * @param chain
 */
export function getReachableNodes(nodeId: string, chain: Chain) {
  const edges = chain.definition.edges;
  const reachableNodes = new Set<string>();

  function _getReachableNodes(nodeId: string) {
    const node = chain.definition.nodes[nodeId];
    reachableNodes.add(nodeId);

    if (node.autorun === false) return;

    const targetNodes = Object.values(edges)
      .filter((edge: ChainEdge) => edge.source === nodeId)
      // do not consider self to be a valid target
      .filter((edge: ChainEdge) => edge.target !== nodeId)
      .map((edge) => edge.target);

    targetNodes.forEach((targetNode) => {
      _getReachableNodes(targetNode);
    });
  }

  _getReachableNodes(nodeId);

  return reachableNodes;
}
