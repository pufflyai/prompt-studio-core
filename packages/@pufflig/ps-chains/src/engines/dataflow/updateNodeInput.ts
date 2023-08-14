import { ParamValue } from "@pufflig/ps-types";
import { Chain, NodeState, RunOptions } from "../../types";
import { applyDefaultInputs } from "./utils/utils";
import _ from "lodash";

/**
 * This function updates the input state of a node without executing the chain.
 *
 * @param nodeId id of the node to run
 * @param input input to update the node inputs with, empty object if existing inputs should be used
 * @param chain current definition and state of the chain
 * @param runOptions
 */
export async function updateNodeInput(
  nodeId: string,
  input: Record<string, ParamValue>,
  chain: Chain,
  runOptions?: RunOptions
) {
  const chainState: Record<string, NodeState> = { ...chain.state };
  const nodeConfig = chain.definition.nodes[nodeId];
  const nodeDefinition = chain.nodeTypes[nodeConfig?.type];

  if (!nodeConfig || !nodeDefinition) {
    throw new Error(`Definition for node ${nodeId} not found`);
  }

  // parse the input
  const nodeState = chainState[nodeId];
  const prevInput = nodeState?.input;
  const parsedInput = await nodeDefinition.parseInput(input, prevInput);

  // compile the new state of the node
  const newInput = { ...applyDefaultInputs(prevInput, nodeDefinition), ...parsedInput };
  const newState: NodeState = { ...nodeState, input: newInput };

  runOptions?.onNodeInputUpdate?.(nodeId, newState);

  const newChainState = _.merge(chainState, { [nodeId]: newState });
  return newChainState;
}
