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
  onNodeStateUpdate: (id: string, state: object) => void,
  chainState?: Record<string, NodeState>
) {
  const nodeDefinition = chain.definition.nodes.find((n) => n.id === nodeId);

  if (!nodeDefinition) {
    throw new Error(`Definition for node ${nodeId} not found`);
  }
  const nodeType = nodeDefinition.type;

  const nodeState = chain.state[nodeId];

  const newInput = { ...nodeState.data, ...input };
  const newState = { ...nodeState, data: newInput };
  let newChainState = { ...(chainState || chain.state), [nodeId]: newState };

  onNodeStateUpdate(nodeId, newState);

  // get all target nodes
  const targetNodes = chain.definition.edges.filter((e) => e.source === nodeId).map((e) => e.target);

  if (targetNodes.length === 0) return newChainState;

  // update the state of all target nodes
  const res = await nodes[nodeType].execute(newInput);

  for (const targetNodeId of targetNodes) {
    newChainState = await runFromNode(chain, targetNodeId, res, onNodeStateUpdate, newChainState);
  }

  return newChainState;
}
