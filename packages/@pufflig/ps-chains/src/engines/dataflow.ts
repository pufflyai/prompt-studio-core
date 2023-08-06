import { nodes } from "@pufflig/ps-nodes";
import { ParamValue } from "@pufflig/ps-types";
import { Chain, NodeState } from "../types";

/**
 * This function updates the input state of a node and executes the node on the new input.
 * Read all target nodes and update their input state.
 * Repeat until there are no more target nodes.
 *
 * @param chain current definition and state of the chain
 * @param nodeId id of the node to run
 * @param input input to update the node inputs with
 * @param onNodeStateUpdate callback that triggers when a node input is updated
 */
export async function runFromNode(
  chain: Chain,
  nodeId: string,
  input: Record<string, ParamValue>,
  onNodeStateUpdate: (id: string, state: object) => void
) {
  // avoid hanging on loops by keeping track of the nodes that have been visited
  // current implementation allows a node to be visited only once
  const visitedNodes: string[] = [];

  async function _runFromNode(
    chain: Chain,
    nodeId: string,
    input: Record<string, ParamValue>,
    onNodeStateUpdate: (id: string, state: object) => void,
    chainState?: Record<string, NodeState>
  ) {
    if (visitedNodes.includes(nodeId)) {
      return chain.state;
    }

    const nodeDefinition = chain.definition.nodes.find((n) => n.id === nodeId);

    if (!nodeDefinition) {
      throw new Error(`Definition for node ${nodeId} not found`);
    }

    visitedNodes.push(nodeId);

    const nodeType = nodeDefinition.type;
    const nodeState = chain.state[nodeId];
    const newInput = { ...nodeState.data, ...input };
    const newState = { ...nodeState, data: newInput };

    let newChainState = { ...(chainState || chain.state), [nodeId]: newState };

    onNodeStateUpdate(nodeId, newState);

    // do not run nodes in the chain that have autorun=false
    // except for the root node
    if (chainState) {
      if (nodeDefinition.autorun === false) {
        return newChainState;
      }
    }

    // get all target nodes
    const targetNodes = chain.definition.edges.filter((e) => e.source === nodeId);
    if (targetNodes.length === 0) {
      return newChainState;
    }

    // update the state of all target nodes
    const res = await nodes[nodeType].execute(newInput);
    const editedKeys = Object.keys(res);

    // ignore target nodes that are not connected to the values that have been edited
    const targetNodeIds = targetNodes.filter((e) => editedKeys.includes(e.source_handle)).map((e) => e.target);
    if (targetNodeIds.length === 0) {
      return newChainState;
    }

    for (const targetNodeId of targetNodeIds) {
      newChainState = await _runFromNode(chain, targetNodeId, res, onNodeStateUpdate, newChainState);
    }

    return newChainState;
  }

  return await _runFromNode(chain, nodeId, input, onNodeStateUpdate);
}
