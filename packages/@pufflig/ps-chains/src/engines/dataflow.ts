import { ParamValue } from "@pufflig/ps-types";
import { Chain } from "../types";

/**
 * This function updates the input state of a node and executes the node on the new input.
 * Read all target nodes and update their input state.
 * Repeat until there are no more target nodes.
 *
 * @param chain
 * @param nodeId
 * @param input
 * @param onNodeStateUpdate
 */
export function runFromNode(
  chain: Chain,
  nodeId: string,
  input: Record<string, ParamValue>,
  onNodeStateUpdate: (id: string, state: object) => {}
) {
  const nodeConfig = chain.definition.nodes.find((n) => n.id === nodeId);

  if (!nodeConfig) {
    throw new Error(`Config for node ${nodeId} not found`);
  }

  const nodeState = chain.state[nodeId];

  const newInput = { ...nodeState.data, ...input };
  const newState = { ...nodeState, data: newInput };

  onNodeStateUpdate(nodeId, newState);

  // nodes[nodeConfig.].execute(newState, chain, onNodeStateUpdate);
}
