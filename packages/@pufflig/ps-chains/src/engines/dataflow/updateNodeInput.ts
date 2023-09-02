import { ParamValue } from "@pufflig/ps-types";
import { Flow, NodeState, RunOptions } from "../../types";
import { applyDefaultInputs } from "./utils/utils";
import { identity } from "./constants";

/**
 * This function updates the input state of a node without executing the chain.
 *
 * @param flow flow to update
 * @param nodeId id of the node to run
 * @param input input to update the node with, empty object if existing inputs should be kept
 * @param runOptions
 * @returns
 */
export async function updateNodeInput(
  flow: Flow,
  nodeId: string,
  input: Record<string, ParamValue>,
  runOptions?: RunOptions
) {
  const flowState: Record<string, NodeState> = { ...flow.state };
  const nodeConfig = flow.definition.nodes[nodeId];
  const nodeDefinition = flow.nodeTypes[nodeConfig?.type];
  const mapInput = nodeDefinition?.mapInput || identity;

  if (!nodeConfig || !nodeDefinition) {
    throw new Error(`Definition for node ${nodeId} not found`);
  }

  // parse the input
  const nodeState = flowState[nodeId];
  const prevInput = nodeState?.input;
  const parsedInput = await mapInput(input, prevInput);

  // compile the new state of the node
  const newInput = { ...applyDefaultInputs(prevInput, nodeDefinition), ...parsedInput };
  const newState: NodeState = { ...nodeState, input: newInput };

  runOptions?.onNodeInputUpdate?.(nodeId, newState);

  return newState;
}
